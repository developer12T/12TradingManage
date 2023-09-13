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
  <div class="p-4 sm:ml-12">
    <div class="p-4 mt-8">
      <div class="ml-8">
        <div class="flex flex-row">
          <div class="w-3/5 flex justify-start flex-col">
            <div class="flex justify-start">
              <Icon icon="gridicons:product" width="24"/>
              รายการสินค้า 339 รายการ
            </div>
            <div class="flex justify-end mt-1 mb-1 m-2">

              <searchbar :searchBar="textInput" @search="handleSearch"></searchbar>
            </div>
            <div class="bg-white-500 m-2 mt-0 h-[550px] overflow-y-scroll">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <TableItem :columns="tableColumns" :data="filteredItems" @selectChange="handleSelectChange">
                  <template v-slot:productName="{ row }">
                    <div class="text-start">
                      {{ row.productName }}
                    </div>
                  </template>
                  <template v-slot:status="{ row }">
                    <div class="flex justify-center items-center">
                      <button
                          class=" text-white bg-green-500 hover:bg-green-800 font-medium px-1 rounded-sm text-sm"
                          type="button"
                          @click="addCart(row.productId,row.productName)">
                        <Icon color="white" height="20" icon="pepicons-pop:plus" width="20"/>
                      </button>
                    </div>
                  </template>
                  <template v-slot:pricePerCTN="{ row }">
                    <div class="text-right">
                      {{ row.pricePerCTN }}
                    </div>
                  </template>
                </TableItem>
              </table>
            </div>
          </div>
          <div class=" w-2/5 flex justify-start flex-col">
            <div class="flex justify-start mb-2">
              <Icon icon="solar:cart-plus-broken" width="24"/>
              รายการที่เลือก 54 รายการ
            </div>
            <div class="h-[550px] overflow-y-scroll mt-0 mb-1 m-2">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tableCart :columns="tableColumnsCart" :data="cart">
                  <template v-slot:status="{ row }">
                    <div class="flex justify-center items-center">
                      <button
                          class=" text-white bg-red-500 hover:bg-red-800 font-medium rounded-sm text-sm"
                          type="button"
                          @click="deleteCart(row.productId)">
                        <Icon color="white" height="20" icon="tabler:minus" width="20"/>
                      </button>
                    </div>
                  </template>
                  <template v-slot:productName="{ row }">
                    <div class="text-left">
                      {{ row.productName }}
                    </div>
                  </template>
                  <template v-slot:pricePerCTN="{ row }">
                    <div class="text-right">
                      {{ row.pricePerCTN }}
                    </div>
                  </template>
                  <template v-slot:qty="{ row }">
                    <div class="text-right">
                      {{ row.qty }}
                    </div>
                  </template>
                </tableCart>
              </table>
            </div>
            <div class="flex justify-end mt-0 mb-1 m-2">
              <button
                  class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  type="button">
                เคลียร์ข้อมูล
              </button>
              <button
                  @click="showCreateAction"
                  class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  type="button">
                บันทึก
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showcreate" aria-hidden="true"
       class="fixed flex justify-center bg-gray-500 bg-opacity-80 top-10 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
       tabindex="-1">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <Icon class="mr-3" icon="emojione-v1:document" width="20"/>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            สร้าง PO
          </h3>
          <button
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              type="button"
              @click="showCreateAction">
            <Icon icon="heroicons:x-mark-20-solid" width="24"/>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div class="flex flex-row justify-between">
            <div><span class="mr-5">เลขที่ : </span><span>รายละเอียด : </span></div>
            <div>วันที่ : 2023-09-12</div>
          </div>
          <div class="border-b"></div>
          <div class="flex flex-row justify-center">
            <div>สรุปรายการ</div>
          </div>
          <div class="flex flex-row justify-center w-full">
            <div class="h-[300px] w-[650px] overflow-y-scroll mt-0 mb-1 m-2">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tableCart :columns="tableColumnsCart" :data="cart">
                  <template v-slot:status="{ row }">
                    <div class="flex justify-center items-center">

                    </div>
                  </template>
                  <template v-slot:productName="{ row }">
                    <div class="text-left">
                      {{ row.productName }}
                    </div>
                  </template>
                  <template v-slot:pricePerCTN="{ row }">
                    <div class="text-right">
                      {{ row.pricePerCTN }}
                    </div>
                  </template>
                  <template v-slot:qty="{ row }">
                    <div class="text-right">
                      {{ row.qty }}
                    </div>
                  </template>
                </tableCart>
              </table>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
              class=" flex justify-center items-center w-24 h-8  text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xs px-5 py-2.5 mr-1"
              type="button"
              @click="addRequis(PayUsers)"
          >
            สร้าง
          </button>
          <button
              class="flex justify-center items-center w-24 h-8 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
              type="button"
              @click="showCreateAction">
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableItem from '../../components/table.vue';
import TableCart from '../../components/table.vue';
import Table from '../../components/table.vue';
import searchbar from "../../components/searchbar.vue";
import SearchOrder from "../../components/searchbar.vue";
import {computed, onMounted, ref} from "vue";
import {usePocoGetItemMasterStore, useUserStore} from '../../stores';
import {Icon} from '@iconify/vue';
import Swal from 'sweetalert2'
import SelectOption from "../../components/selectoption.vue";


export default {
  components: {
    SearchOrder,
    SelectOption,
    Table,
    Icon,
    TableCart,
    TableItem,
    searchbar
  },
  setup() {
    const showModal = ref(false)
    const tableColumns = computed(() => {
      return [
        {
          id: 'channel', title: 'ช่องทาง', options: dataSelect.value.map(item => ({
            value: item.value,
            label: item.name,
          })),
          selectedOption: 'All',
        },
        {
          id: 'group', title: 'กลุ่ม', options: dataSelectGroup.value.map(item => ({
            value: item.value,
            label: item.name,
          })),
          selectedOption: 'All',
        },
        {id: 'productId', title: 'รหัสสินค้า'},
        {id: 'productName', title: 'ชิ่อสินค้า'},
        {id: 'pricePerCTN', title: 'ราคาต่อหีบ'},
        {id: 'status', title: '#'},
      ];
    });

    const dataSelect = computed(() => {
      return [
        {value: 'CR', name: 'CR'},
        {value: 'EX', name: 'EX'},
        {value: 'ID', name: 'ID'},
      ];
    });
    const dataSelectGroup = computed(() => {
      return [
        {value: 'G01', name: 'G01'},
        {value: 'G02', name: 'G02'},
        {value: 'G03', name: 'G03'},
        {value: 'G04', name: 'G04'},
        {value: 'G05', name: 'G05'},
      ];
    });

    const tableColumnsCart = computed(() => {
      return [
        {id: 'productId', title: 'รหัสสินค้า'},
        {id: 'productName', title: 'ชิ่อสินค้า'},
        {id: 'pricePerCTN', title: 'ราคาต่อหีบ'},
        {id: 'qty', title: 'จำนวน'},
        {id: 'status', title: '#'}
      ];
    });

    const store = usePocoGetItemMasterStore();
    const storeUser = useUserStore();

    const product = computed(() => {
      return storeUser.getDataSelectCart;
    });

    const cart = computed(() => {
      return storeUser.getDataCart;
    });

    onMounted(() => {
      storeUser.getSelectCart();
      storeUser.getCart();
    });

    const addCart = async (idproduct,productName) => {
      console.log(idproduct)
      Swal.fire({
        title: 'จำนวนสินค้า',
        text:`${idproduct} `+` ${productName}`,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
        confirmButtonColor: '#28A745',
        showLoaderOnConfirm: true,
        preConfirm: async (countt) => {
          if (!countt) {
            Swal.showValidationMessage('กรุณากรอกจำนวนที่ต้องการเบิก');
          } else {
            if (!isNaN(parseInt(countt))) {
              return await storeUser.addCartData(idproduct, countt);
            } else {
              Swal.showValidationMessage('กรุณากรอกตัวเลขเท่านั้น');
            }
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = JSON.parse(localStorage.getItem("token"));
          console.log(token)

          await storeUser.getSelectCart();
          await storeUser.getCart();
          console.log(idproduct)
        }
      })
    }

    const deleteCart = async (idProduct) => {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(token)
      await storeUser.deleteCartData(idProduct);
      await storeUser.getSelectCart();
      await storeUser.getCart();
      console.log(idProduct)
    }

    const showcreate = ref(false)
    const showCreateAction = () => {
      showcreate.value = !showcreate.value
    }


    // search bar start
    const textInput = ref('');
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return product.value;
      }
      const keyword = textInput.value.toLowerCase();
      return product.value.filter(
          (item) =>
              item.channel.toLowerCase().includes(keyword) ||
              item.group.toLowerCase().includes(keyword) ||
              item.productId.toLowerCase().includes(keyword) ||
              item.productName.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
      console.log(searchText)
    };

    const handleSelectChange = (selectedValue) => {
      textInput.value = selectedValue;
    }


    return {
      showModal,
      handleSelectChange,
      dataSelect,
      textInput,
      filteredItems,
      cart,
      product,
      tableColumns,
      tableColumnsCart,
      showcreate,
      showCreateAction,
      deleteCart,
      addCart,
      handleSearch
    };
  }
};
</script>
