<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <SearchBar :searchBar="textInput" @search="handleSearch" />
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th
                v-for="title in tbHeader"
                :key="title.title"
                scope="col"
                class="px-6 py-3"
              >
                {{ title.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedData"
              :key="item.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="px-6 py-4">{{ item.name }}</td>
              <td class="px-6 py-4">{{ item.sku }}</td>
              <td class="px-6 py-4">{{ item.sellprice }}</td>
              <td class="px-6 py-4">{{ item.stock }}</td>
              <td class="px-6 py-4">{{ item.availablestock }}</td>
            </tr>
          </tbody>
        </table>
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
import Pagination from "../../components/pagination.vue";
export default {
  components: {
    SearchBar,
    Pagination,
  },
  setup() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push("/");
    }
    const store = useItemStore();
    const items = computed(() => {
      return store.zortItem;
    });

    const textInput = ref('');
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return items.value;
      }
      const keyword = textInput.value.toLowerCase();
      return items.value.filter((item) =>
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
      onPageChange
    };
  },
};
</script>
