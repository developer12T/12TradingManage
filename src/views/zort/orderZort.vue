<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div
        class="flex justify-between flex-col mb-2 sm:flex-row sm:items-center"
      >
        <a
          :href="'http://58.181.206.156:8080/12Trading/zort_pdf/order.php?checklist='+selected"
          target="_blank"
          class="text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-5 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          พิมพ์ใบเสร็จ
      </a>
        <SearchBar :searchBar="textInput" @search="handleSearch" />
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th class="px-6 py-3">
                <input
                  type="checkbox"
                  :checked="selectAll"
                  @change="setSelectAll($event.target.checked)"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
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
              <td class="px-6 py-4">
                <input
                  type="checkbox"
                  v-model="selected"
                  :value="order.id"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
              <td class="px-6 py-4">{{ order.orderdateString }}</td>
              <td class="px-6 py-4">{{ order.number }}</td>
              <td class="px-6 py-4">{{ order.customer }}</td>
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
import { onMounted, computed, ref, watch } from "vue";
import { useAuthStore, useOrderStore, useUtilityStore } from "../../stores";
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
          item.customer.toLowerCase().includes(keyword) ||
          item.orderdateString.toLowerCase().includes(keyword) ||
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

    // checkbox start
    const checkboxStore = useUtilityStore();
    const selected = computed({
      get: () => checkboxStore.selectedCheckboxes,
      set: (value) => checkboxStore.updateSelectedCheckboxes(value),
    });

    const selectAll = computed(() => {
      return paginatedData.value
        ? selected.length === paginatedData.value.length
        : false;
    });

    const setSelectAll = (value) => {
      const selectedId = [];
      if (value) {
        paginatedData.value.forEach((item) => {
          selectedId.push(item.id);
        });
      }
      selected.value = selectedId;
    };

    watch(selected, (newValue) => {
      console.log("Selected ID:", selected.value);
    });

    // checkbox end

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
      selected,
      selectAll,
      setSelectAll,
    };
  },
};
</script>
