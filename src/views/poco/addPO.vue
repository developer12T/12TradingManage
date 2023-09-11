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
            <div class="flex justify- mt-1 mb-1 m-2">
              <div class="w-1/2" >
                <SelectOption :searchBar="textInput" @search="handleSearch"/>
              </div>
              <searchbar :searchBar="textInput" @search="handleSearch"></searchbar>
            </div>
            <div class="bg-gray-500 flex justify-center m-2 mt-0 h-[550px] overflow-y-scroll">
              <table class="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                <TableItem :columns="tableColumns" :data="filteredItems">
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
                          @click="addCart(row.productId)">
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
              <button class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                      type="button">
                เคลียร์ข้อมูล
              </button>
              <button
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
</template>
<script>
import TableItem from '../../components/table.vue';
import TableCart from '../../components/table.vue';
import Table from '../../components/table.vue';
import searchbar from "../../components/searchbar.vue";
import {computed, onMounted, ref} from "vue";
import {usePocoGetItemMasterStore, useUserStore} from '../../stores';
import {Icon} from '@iconify/vue';
import Swal from 'sweetalert2'
import SelectOption from "../../components/selectoption.vue";
import SearchOrder from "../../components/searchbar.vue";

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

    const tableColumns = computed(() => {
      return [
        {id: 'channel', title: 'ช่องทาง'},
        {id: 'group', title: 'กลุ่ม'},
        {id: 'productId', title: 'รหัสสินค้า'},
        {id: 'productName', title: 'ชิ่อสินค้า'},
        {id: 'pricePerCTN', title: 'ราคาต่อหีบ'},
        {id: 'status', title: '#'},
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

    const addCart = async (idproduct) => {
      console.log(idproduct)
      Swal.fire({
        title: 'จำวนวนสินค้า',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
          return await storeUser.addCartData(idproduct, login);
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


    // search bar start
    const textInput = ref("");
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return product.value;
      }
      const keyword = textInput.value.toLowerCase();
      return product.value.filter(
          (item) =>
              item.productId.toLowerCase().includes(keyword) ||
              item.productName.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
      console.log(searchText)
    };


    return {
      textInput,
      filteredItems,
      cart,
      product,
      tableColumns,
      tableColumnsCart,
      deleteCart,
      addCart,
      handleSearch
    };
  }
};
</script>
