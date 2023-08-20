<style xmlns="">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
}

.flash-label {
  animation: flash 5s infinite;
  font-weight: bold;
  color: red;
  font-size: smaller;
}
</style>
<template>
  <div class="p-4 sm:ml-20">
    <div class="p-4 mt-12">
      <div class="ml-8">
        <div class="flex-row flex align-middle">
          <label
              class="block w-full h-8 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center"
              for="file_input">
            <input
                id="file_input"
                accept=".xlsx"
                aria-describedby="file_input_help"
                class="hidden"
                type="file"
                @change="displayFileName($event)">
            <div class="flex-center" style="height: 100%;">
              <Icon height="20" icon="line-md:cloud-up" width="20"/>
              <span>{{ fileName || 'อัปโหลดไฟล์' }}</span>
            </div>
          </label>
          <button
              :class="{
              'bg-green-500 w-32 hover:bg-green-800  py-2 hover:text-gray-200 text-xs font-medium': fileName,
              'bg-gray-400 w-32 font-medium text-xs  py-2': !fileName
            }"
              :disabled="!fileName"
              class="rounded-lg w-32 ml-2 h-8 py-2 font-medium text-xs text-white hover:!accent-gray-500 flex items-center justify-center"
              @click="uploadFile"
          >
            อัปโหลด
          </button>
        </div>


      </div>
      <!--      <div class="flex justify-start ml-8">-->
      <!--        <label class="block mb-2 mt-1 text-sm font-medium text-gray-700 dark:text-white flash-label" for="file_input">*อัพโหลดไฟล์รายการสินค้า-->
      <!--          .xlsx only (MAX. 10MB)</label>-->
      <!--      </div>-->
      <div class="mb-1.5 mt-12 flex justify-center">
        <div>
          <span class="text-sm font-medium ml-8">รายการราคาสินค้าล่าสุดที่อัปเดต วันที่</span><span
            class="text-sm font-medium"> 2023/08/01</span>
        </div>
      </div>
      <div class="flex justify-end mb-2">
        <button v-if="dataProduct === null"
             disabled   class="bg-gray-400 w-32   rounded-lg  ml-2 h-8 py-2 font-medium text-xs text-white  flex items-center justify-center"
        >
          อัปเดตสินค้า
        </button>

        <button v-else
                 class="bg-green-500 w-32 hover:bg-green-800  hover:text-gray-200  rounded-lg  ml-2 h-8 py-2 font-medium text-xs text-white hover:!accent-gray-500 flex items-center justify-center"
        >
          อัปเดตสินค้า
        </button>
      </div>
      <div class="ml-8">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableItem v-if="dataProduct === null " :columns=tableColumns :data=product>
            <template v-slot:pricePerCTN="{ row }">
        <span v-if="row.pricePerCTN === null">
         ไม่มีราคา
        </span><span v-else>
         {{ row.pricePerCTN }}
        </span>
            </template>
          </TableItem>
          <TableItem v-else :columns=tableColumns :data=dataProduct>
            <template v-slot:pricePerCTN="{ row }">
        <span v-if="row.pricePerCTN === null">
         ไม่มีราคา
        </span><span v-else>
         {{ row.pricePerCTN }}
        </span>
            </template>
          </TableItem>
        </table>
      </div>


      <div v-if="showProgressModal" class="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-75 ">
        <div class="bg-white p-4 w-60 rounded-lg shadow-md">

          <div class="h-1 rounded-lg w-full bg-gray-200">
            <div :style="{ width: uploadProgress + '%' }" class="h-1 rounded-lg bg-green-500"></div>
          </div>

          <div v-if="uploadProgress <= 100" class="mt-2 text-center text-gray-600 dark:text-gray-400">{{
              uploadProgress
            }}%
          </div>
          <div v-else class="text-center text-gray-600 dark:text-gray-400">{{ uploadProgress }}</div>
          <div class="mt-2 flex justify-center">
            <div v-if="uploadProgress < 100" class="loader">กำลังอัพโหลดไฟล์ ...</div>
            <div v-else-if="uploadProgress === 100" class="loader">กำลังประมวลผลไฟล์ ...</div>
            <div v-else-if="uploadProgress === 'well done'" class="loader"></div>
            <div v-if="uploadStatus === 200">
              อัพโหลดสำเร็จ
            </div>
            <div v-else-if="uploadStatus === 500">
              รูปแบบในเนื้อหาไฟล์ไม่ถูกต้อง
            </div>
            <div v-else>
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>

    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {computed, onMounted, ref} from 'vue'; // เพิ่ม ref เข้ามา
import {usePocoGetItemStore} from '../../stores';
import TableItem from '../../components/table.vue';
import {Icon} from '@iconify/vue';


export default {
  components: {
    TableItem,
    Icon,
  },
  setup() {
    const iconSize = ref('1.5x');
    const bgClass = ref('bg-blue-500');
    const tableColumns = computed(() => {
      return [
        {id: 'channel', title: 'ช่องทาง'},
        {id: 'productId', title: 'รหัสสินค้า'},
        {id: 'productName', title: 'ชิ่อสินค้า'},
        {id: 'pricePerCTN', title: 'ราคาต่อหีบ'},
      ];
    });


    const store = usePocoGetItemStore();
    const product = computed(() => {
      return store.pocoGetItem;
    });

    onMounted(() => {
      store.getPreItem();
    });

    // ใช้ ref สำหรับการเก็บค่า fileName, uploadProgress, showProgressModal, uploadStatus, dataProduct
    const fileName = ref(null);
    const uploadProgress = ref(0);
    const showProgressModal = ref(false);
    const uploadStatus = ref(null);
    const dataProduct = ref(null);

    const displayFileName = (event) => {
      if (event.target.files.length > 0) {
        fileName.value = event.target.files[0].name;
      } else {
        fileName.value = null;
      }
    };

    const uploadFile = async () => {
      if (!fileName.value) {
        return;
      }

      const fileInput = document.getElementById('file_input');
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append('ItemMaster', file);

      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
          onUploadProgress: (progressEvent) => {
            uploadProgress.value = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
            );
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
        showProgressModal.value = true;

        const response = await axios.post(
            import.meta.env.VITE_API_URL +
            '/PurchaseCustomerOrder/file/FileManage/addFile',
            formData,
            config
        );

        if (response.status === 200) {
          uploadProgress.value = 'well done';
          uploadStatus.value = 200;
          dataProduct.value = response.data.list;
          console.log(response.data.list);
        } else {
          uploadProgress.value = 'Not upload';
          uploadStatus.value = 400;
          console.log(response.status);
        }
      } catch (error) {
        uploadProgress.value = 'Error file';
        uploadStatus.value = 500;
        console.error(error.response.status);
      } finally {
        setTimeout(() => {
          showProgressModal.value = false;
          uploadProgress.value = 0;
          uploadStatus.value = null;
        }, 2000);
      }
    };

    const beforeDestroy = () => {
      showProgressModal.value = false;
      uploadProgress.value = 0;
      uploadStatus.value = null;
    };

    return {
      tableColumns,
      iconSize,
      bgClass,
      product,
      fileName,
      uploadProgress,
      showProgressModal,
      uploadStatus,
      dataProduct,
      displayFileName,
      uploadFile,
      beforeDestroy,
    };
  },
};
</script>
