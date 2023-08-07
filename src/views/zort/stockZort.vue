<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div
        class="flex justify-between flex-col mb-0 sm:flex-row sm:items-center"
      >
        <div class="flex justify-between">
          <button
          @click="updateStockErp"
          type="button"
          class="text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 mr-3 text-center mb-0 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          นำเข้าสต็อกจาก Erp
        </button>
        <button
          @click="updateStockZort"
          type="button"
          class="text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-0 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          นำเข้าสินค้าจาก Zort
        </button>
        </div>
        <SearchBar :searchBar="textInput" @search="handleSearch" />
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table :columns="tableColumns" :data="paginatedData">
          <template v-slot:availablestock="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.availablestock > 0"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.availablestock }}
              </span>
              <span
                v-if="row.availablestock <= 0"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-blue-300"
              >
                {{ row.availablestock }}
              </span>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :itemsPerPage="itemsPerPage"
      @page-changed="onPageChange"
    />
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useAuthStore, useItemStore } from "../../stores";
import Swal from "sweetalert2";
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
        { id: "name", title: "Name" },
        { id: "sku", title: "SKU" },
        { id: "sellprice", title: "Price" },
        { id: "stock", title: "Stock" },
        { id: "availablestock", title: "Available" },
      ];
    });

    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push("/");
    }
    const store = useItemStore();
    const items = computed(() => {
      return store.zortItem;
    });

    const updateStockErp = async () => {
      try {
        Swal.fire({
          icon: "info",
          title: "กำลังอัปเดตสต็อก",
          text: "กรุณารอสักครู่...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        await store.updateErpStock();
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "อัปเดตสต็อกสินค้าสำเร็จ",
        });
        await store.getProductZort();
      } catch (error) {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถอัปเดตสต็อกสินค้าได้",
        });
      }
    };

    const updateStockZort = async () => {
      try {
        Swal.fire({
          icon: "info",
          title: "กำลังอัปเดตสต็อก",
          text: "กรุณารอสักครู่...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        await store.updateZortStock();
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "อัปเดตสต็อกสินค้าสำเร็จ",
        });
        await store.getProductZort();
      } catch (error) {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถอัปเดตสต็อกสินค้าได้",
        });
      }
    };

    const textInput = ref("");
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return items.value;
      }
      const keyword = textInput.value.toLowerCase();
      return items.value.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.sku.toLowerCase().includes(keyword)
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
      store.getProductZort();
    });

    return {
      items,
      textInput,
      filteredItems,
      handleSearch,
      tableColumns,
      tbHeader: [
        { title: "Name" },
        { title: "SKU" },
        { title: "Price" },
        { title: "Stock" },
        { title: "Available" },
      ],
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedData,
      onPageChange,
      updateStockErp,
      updateStockZort,
    };
  },
};
</script>
