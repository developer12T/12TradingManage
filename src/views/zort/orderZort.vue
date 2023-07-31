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
              v-for="order in paginatedData"
              :key="order.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <!-- ตรงนี้ถ้าจะเปลี่ยน obj ที่จะแสดง -->

              <td class="px-6 py-4">{{ order.orderdate }}</td>
              <td class="px-6 py-4">{{ order.number }}</td>
              <!-- <td class="px-6 py-4">{{ order.customername }}</td> -->
              <td class="px-6 py-4">{{ order.customerid }}</td>
              <td class="px-6 py-4">{{ order.amount }}</td>
              <td class="px-6 py-4">{{ order.status }}</td>
              <td class="px-6 py-4">{{ order.paymentstatus }}</td>
              <td class="px-6 py-4">{{ order.saleschannel }}</td> 
            </tr>
          </tbody>
        </table>
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
import { useAuthStore, useOrderStore } from "../../stores";
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

    const store = useOrderStore();
    const orders = computed(() => {
      // return store.zortOrder.list;
      return store.zortOrder;
    });

    // search bar start
    const textInput = ref("");
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return orders.value;
      }
      const keyword = textInput.value.toLowerCase();
      return orders.value.filter(
        (item) =>
          item.number.toLowerCase().includes(keyword) ||
          item.customername.toLowerCase().includes(keyword) ||
          item.orderdate.toLowerCase().includes(keyword) ||
          item.saleschannel.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };
    // search bar end

    // pagination start
    let currentPage = ref(1);
    const onPageChange = (pageNumber) => {
      currentPage.value = pageNumber;
    };

    let itemsPerPage = ref(13);
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
    // pagination end

    // ตรงนี้จะเป็นการเรียก getOrderZort จาก store useOrderStore ทุกครั้งที่มีการเรียกใช้ component นี้
    console.log("orders", orders);
    onMounted(() => {
      store.getOrderZort();
    });

    return {
      orders,
      textInput,
      filteredItems,
      handleSearch,
      tbHeader: [
        { title: "orderdate" },
        { title: "number" },
        { title: "customername" },
        { title: "amount" },
        { title: "status" },
        { title: "paymentstatus" },
        { title: "channel" },
      ],
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedData,
      onPageChange,
    };
  },
};
</script>

<style></style>
