<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div class="flex justify-between flex-col mb-0 sm:flex-row sm:items-center">
        <!-- <div></div> -->
        <SearchBar :searchBar="textInput" @search="handleSearch" />
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table :columns="tableColumns" :data="paginatedData">
          <template v-slot:available="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.available > 0 "
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.available }}
              </span>
              <span
                v-if="row.available <= 0"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-blue-300"
              >
                {{ row.available }}
              </span>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :itemsPerPage="itemsPerPage" @page-changed="onPageChange" />
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useAuthStore, useItemStore } from "../../stores";
import router from "../../router";
import SearchBar from "../../components/searchbar.vue";
import Table from "../../components/table.vue";
import Pagination from "../../components/pagination.vue";
export default {
  components: {
    SearchBar,
    Table,
    Pagination,
  },
  setup() {

    const tableColumns = computed(() => {
      return [
        { id: "warehouse", title: "Warehouse" },
        { id: "itemcode", title: "Item Code" },
        { id: "itemsname", title: "Item Name" },
        { id: "location", title: "Location" },
        { id: "lot", title: "Lot" },
        { id: "balance", title: "Balance" },
        { id: "allocated", title: "Allocated" },
        { id: "available", title: "Available" },
      ];
    });
    
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push("/");
    }
    
    const store = useItemStore();
    const items = computed(() => {
      return store.erpItem;
    });

    const textInput = ref('');
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return items.value;
      }
      const keyword = textInput.value.toLowerCase();
      return items.value.filter((item) =>
        item.itemcode.toLowerCase().includes(keyword) ||
        item.lot.toLowerCase().includes(keyword) ||
        item.warehouse.toLowerCase().includes(keyword) ||
        item.itemsname.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };

    let currentPage = ref(1);
    const onPageChange = (pageNumber) => {
      currentPage.value = pageNumber;
    };

    let itemsPerPage = ref(10);
    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / itemsPerPage.value);
    });

    const paginatedData = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return filteredItems.value.slice(startIndex, endIndex);
    });

    onMounted(() => {
      store.getProductERP();
    });

    return { 
      items,
      textInput,
      filteredItems,
      handleSearch,
      tableColumns,
      currentPage,
      itemsPerPage,
      totalPages, 
      paginatedData,
      onPageChange
    };
  },
};
</script>
