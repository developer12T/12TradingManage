<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div
        class="flex justify-between flex-col mb-0 sm:flex-row sm:items-center"
      >
        <a
          @click="printReceipt()"
          :href="
            'http://58.181.206.156:8080/12Trading/zort_pdf/printReceipt.php?checklist=' +
            selected
          "
          target="_blank"
          class="text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-0 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          :class="{ 'pointer-events-none': !isItemSelected }"
        >
          พิมพ์ใบเสร็จ
        </a>
        <SearchBar :searchBar="textInput" @search="handleSearch" />
      </div>

      <div
        class="text-sm font-medium text-center mb-1 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white rounded-lg"
      >
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <a
              @click="handleTabs('wait-tab')"
              :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':
                  tabs === 'wait-tab',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'wait-tab',
              }"
              aria-current="page"
              >รอพิมพ์</a
            >
          </li>
          <li class="mr-2">
            <a
              @click="handleTabs('success-tab')"
              :class="{
                'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500':
                  tabs === 'success-tab',
                'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-500 dark:hover:text-gray-300':
                  tabs !== 'success-tab',
              }"
              >พิมพ์สำเร็จ</a
            >
          </li>
        </ul>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableCheckbox
          :columns="tableColumns"
          :data="filteredItems"
          :selected="selected"
          @update:selected="onSelectedUpdate"
        >
          <template v-slot:status="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.status === 'Success'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Pending'"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Voided'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                {{ row.status }}
              </span>
              <span
                v-if="row.status === 'Waiting'"
                class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
              >
                {{ row.status }}
              </span>
            </div>
          </template>
          <template v-slot:paymentstatus="{ row }">
            <div class="flex items-center justify-center">
              <span
                v-if="row.paymentstatus === 'Paid'"
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                {{ row.paymentstatus }}
              </span>
              <span
                v-if="row.paymentstatus === 'Pending'"
                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {{ row.paymentstatus }}
              </span>
              <span
                v-if="row.paymentstatus === 'Voided'"
                class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                {{ row.paymentstatus }}
              </span>
            </div>
          </template>
          <template v-slot:saleschannel="{ row }">
            <div class="flex items-center justify-center">
              <img
                v-if="row.saleschannel === 'Shopee'"
                src="/shopee-icon.png"
                width="15"
                class="mr-1"
              />
              <img
                v-else-if="row.saleschannel === 'Lazada'"
                src="/lazada-icon.png"
                width="15"
                class="mr-1"
              />
              <span :title="row.saleschannel">{{ row.saleschannel }}</span>
            </div>
          </template>
        </TableCheckbox>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useAuthStore, useOrderStore, useUtilityStore } from "../../stores";
import router from "../../router";
import SearchBar from "../../components/searchbar.vue";
import TableCheckbox from "../../components/tableCheckbox.vue";

export default {
  components: {
    SearchBar,
    TableCheckbox,
  },
  setup() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push("/");
    }

    const tableColumns = computed(() => {
      return [
        { id: "createdatetime", title: "orderdate" },
        { id: "number", title: "number" },
        { id: "customer", title: "customername" },
        { id: "amount", title: "amount" },
        { id: "status", title: "status" },
        { id: "paymentstatus", title: "paymentstatus" },
        { id: "saleschannel", title: "channel" },
        { id: "totalprint", title: "printcount" },
      ];
    });

    const store = useOrderStore();
    const orders = computed(() => {
      return store.zortOrder;
    });

    const selected = ref([]);
    const isItemSelected = ref(false);
    const onSelectedUpdate = (newValue) => {
      selected.value = newValue;
      isItemSelected.value = selected.value.length > 0;
    };

    const tabs = ref("wait-tab");
    const handleTabs = (tabName) => {
      tabs.value = tabName;
      console.log("tabs value after click:", tabs.value);
      store.setTab(tabs.value);
      checkbox.updateSelectedCheckboxes([]);
    };

    const checkbox = useUtilityStore();
    const printReceipt =  () => {
      store.getOrderZort();
    };

    const clearCheckbox = () => {
      checkbox.updateSelectedCheckboxes([]);
      // selected.value = [];
    };

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

    onMounted(() => {
      store.getOrderZort();
    });

    return {
      tableColumns,
      orders,
      textInput,
      filteredItems,
      handleSearch,
      selected,
      isItemSelected,
      onSelectedUpdate,
      handleTabs,
      tabs,
      printReceipt,
      clearCheckbox,
    };
  },
};
</script>
