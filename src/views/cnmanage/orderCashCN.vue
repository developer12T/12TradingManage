<template>
        <!-- <div class="flex flex-col-reverse sm:flex-row justify-end items-center mb-4"> -->
        <div class="flex justify-between items-center mb-4">
        <!-- <dateCn></dateCn> -->
        <p>รายงานยอดคืนสินค้า หน่วยเงินสด</p>
        <SearchOrderCn :searchBar="textInput" @search="handleSearch" />
      </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <TableCnOrder :columns="tableColumns" :data="paginatedData">
        <template v-slot:itemname="{ row }">
            <div class="flex items-center justify-start">
              {{ row.itemname }}
            </div>
          </template>
          <template v-slot:itemtype="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.itemtype === 'ดี'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.itemtype }}
              </span>
              <span
                v-if="row.itemtype === 'เสีย'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-blue-300"
              >
                {{ row.itemtype }}
              </span>
            </div>
          </template>
    </TableCnOrder>
  </table>
  <ul class="ml-auto mt-2">
    <PaginateOrderCn
      :currentPage="currentPage"
      :totalPages="totalPages"
      :itemsPerPage="itemsPerPage"
      @page-changed="onPageChange"
    />
  </ul>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useCnmOrderStore } from "../../stores";
import SearchOrderCn from "../../components/searchbar.vue";
import dateCn from "../../components/datepicker.vue";
import TableCnOrder from "../../components/table.vue";
import PaginateOrderCn from "../../components/pagination.vue";
export default {
  components: {
    SearchOrderCn,
    dateCn,
    TableCnOrder,
    PaginateOrderCn,
  },
  setup() {
    const tableColumns = computed(() => {
      return [
        { id: "orderdate", title: "วันที่" },
        { id: "orderno", title: "หมายเลขรายการ" },
        { id: "zone", title: "ภาค" },
        { id: "area", title: "เขต" },
        { id: "itemcode", title: "รหัสสินค้า" },
        { id: "itemname", title: "ชื่อสินค้า" },
        { id: "itemqty", title: "จำนวน" },
        { id: "itemunit", title: "หน่วย" },
        { id: "itemprice", title: "ราคา" },
        { id: "itemtype", title: "ประเภท" },
      ];
    });

    const store = useCnmOrderStore();
    const ordersCn = computed(() => {
      return store.cnOrder;
    });

    const textInput = ref("");
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return ordersCn.value;
      }
      const keyword = textInput.value.toLowerCase();
      return ordersCn.value.filter(
        (item) =>
          item.zone.toLowerCase().includes(keyword) ||
          item.area.toLowerCase().includes(keyword) ||
          item.itemcode.toLowerCase().includes(keyword) ||
          item.itemname.toLowerCase().includes(keyword) ||
          item.orderno.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };

    let currentPage = ref(1);
    const onPageChange = (pageNumber) => {
      currentPage.value = pageNumber;
    };

    let itemsPerPage = ref(30);
    const totalPages = computed(() => {
      if (filteredItems.value && filteredItems.value.length) {
        return Math.ceil(filteredItems.value.length / itemsPerPage.value);
      } else {
        return 0;
      }
    });

    const paginatedData = computed(() => {
      if (filteredItems.value && filteredItems.value.length > 0) {
        const startIndex = (currentPage.value - 1) * itemsPerPage.value;
        const endIndex = startIndex + itemsPerPage.value;
        return filteredItems.value.slice(startIndex, endIndex);
      } else {
        return [];
      }
    });

    onMounted(() => {
      store.getOrderCn();
    });

    return {
      tableColumns,
      ordersCn,
      textInput,
      filteredItems,
      handleSearch,
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedData,
      onPageChange,
    };
  },
};
</script>
