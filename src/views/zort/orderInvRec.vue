<template>
  <navbar></navbar>
  <div class="p-4 sm:ml-52">
    <div
      class="p-2 border-gray-200 border rounded-lg dark:border-gray-700 mt-14"
    >
      <div
        class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <ul
          class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
          id="defaultTab"
          data-tabs-toggle="#defaultTabContent"
          role="tablist"
        >
          <li class="mr-1">
            <button
              id="all-tab"
              v-bind:class="{ actives: activeTab === 'all-tab' }"
              v-on:click="changeTab('all-tab')"
              @click="getOrder('all-tab')"
              data-tabs-target="#all"
              type="button"
              role="tab"
              aria-controls="all"
              aria-selected="true"
              class="actives inline-block p-4 active rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500"
            >
              ทั้งหมด
            </button>
          </li>
          <li class="mr-1">
            <button
              id="taxinv-tab"
              v-bind:class="{ actives: activeTab === 'taxinv-tab' }"
              v-on:click="changeTab('taxinv-tab')"
              @click="getOrder('taxinv-tab')"
              data-tabs-target="#taxinv"
              type="button"
              role="tab"
              aria-controls="taxinv"
              aria-selected="false"
              class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ขอใบกำกับภาษีรอปริ้น
            </button>
          </li>
          <li class="mr-1">
            <button
              id="tracking-tab"
              v-bind:class="{ actives: activeTab === 'tracking-tab' }"
              v-on:click="changeTab('tracking-tab')"
              @click="getOrder('tracking-tab')"
              data-tabs-target="#tracking"
              type="button"
              role="tab"
              aria-controls="tracking"
              aria-selected="false"
              class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              รอจัดส่งสินค้า
            </button>
          </li>
          <li class="mr-1">
            <button
              id="print-tab"
              v-bind:class="{ actives: activeTab === 'print-tab' }"
              v-on:click="changeTab('print-tab')"
              @click="getOrder('print-tab')"
              data-tabs-target="#print"
              type="button"
              role="tab"
              aria-controls="print"
              aria-selected="false"
              class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ปริ้นใบเสร็จสำเร็จ
            </button>
          </li>
          <li class="mr-1">
            <button
              id="success-tab"
              v-bind:class="{ actives: activeTab === 'success-tab' }"
              v-on:click="changeTab('success-tab')"
              @click="getOrder('success-tab')"
              data-tabs-target="#success"
              type="button"
              role="tab"
              aria-controls="success"
              aria-selected="false"
              class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              เสร็จสิ้น
            </button>
          </li>
          <div class="flex items-center">
            <button
              type="button"
              class="inline-flex items-center px-5 h-8 mr-1 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              พิมพ์ใบกำกับภาษี
            </button>
            <!-- <button type="button" @click="printorder()"  target="_blank"
                                    class="inline-flex items-center px-5 h-8 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    พิมพ์ใบเสร็จ
                                
                                </button> -->
            <a
              type="button"
              :href="
                'http://58.181.206.156:8080/12Trading/zort_pdf/order.php?checklist=' +
                checklist
              "
              target="_blank"
              class="inline-flex items-center px-5 h-8 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              พิมพ์ใบเสร็จ
            </a>
          </div>
          <li class="flex items-center ml-2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">ค้นหา</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ค้นหา"
                  required
                />
              </div>
              <!-- <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"></button> -->
            </form>
          </li>
        </ul>
        <div
          class="relative overflow-x-auto shadow-md sm:rounded-sm"
          id="show_table"
        >
          <table class="w-full text-sm text-left text-black dark:text-gray-400">
            <thead class="text-sm text-white uppercase bg-blue-500">
              <tr>
                <th scope="col" class="px-2 py-3">
                  <div class="flex items-center">
                    <input
                      @change="disableSecondCheckbox"
                      id="recipt"
                      value="all"
                      v-model="checklist"
                      type="checkbox"
                      class="w-4 h-4 mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only"
                      >checkbox</label
                    >
                    เลือก
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">รหัสรายการ</th>
                <th scope="col" class="px-6 py-3">เลขที่อ้างอิง</th>
                <th scope="col" class="px-6 py-3">รหัสลูกค้า</th>
                <th scope="col" class="px-6 py-3">ชื่อลูกค้า</th>
                <th scope="col" class="px-6 py-3">สถานะ</th>
                <th scope="col" class="px-6 py-3">สถานะการจ่าย</th>
              </tr>
            </thead>
            <tbody v-if="this.orders.length > 0">
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="(data, index) in this.orders"
                :key="index"
              >
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      :disabled="checklist.includes('all')"
                      :checked="checklist.includes('all')"
                      id="recipt"
                      :value="data.id"
                      v-model="checklist"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{ data.id }}
                </td>
                <td class="px-6 py-4">
                  {{ data.number }}
                </td>
                <td class="px-6 py-4">
                  {{ data.customerid }}
                </td>
                <td class="px-6 py-4">
                  {{ data.customername }}
                </td>
                <td class="px-6 py-4">
                  {{ data.status }}
                </td>
                <td class="px-6 py-4">
                  {{ data.paymentstatus }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7">
                  <div
                    role="status"
                    class="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                        ></div>
                        <div
                          class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                        ></div>
                      </div>
                      <div
                        class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                      <div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                        ></div>
                        <div
                          class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                        ></div>
                      </div>
                      <div
                        class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                      <div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                        ></div>
                        <div
                          class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                        ></div>
                      </div>
                      <div
                        class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                      <div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                        ></div>
                        <div
                          class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                        ></div>
                      </div>
                      <div
                        class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                      <div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"
                        ></div>
                        <div
                          class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                        ></div>
                      </div>
                      <div
                        class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"
                      ></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../../components/zort/bar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      orders: [],
      checklist: [],
    };
  },
  mounted() {
    this.getOrder();
    // console.log('amount')
    console.log(this.checklist);
  },

  methods: {
    changeTab(tabId) {
      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        button.classList.remove("actives");
      });

      const clickedButton = document.getElementById(tabId);
      clickedButton.classList.add("actives");

      this.activeTab = tabId;
      if (tabId == "taxinv-tab") {
      } else {
      }
    },
    disableSecondCheckbox() {
      if (this.checklist.includes("all")) {
        this.checklist = ["all"];
      } else {
        this.checklist = [];
      }
    },
    getOrder(id) {
      if (id == undefined) {
        id = "all-tab";
      }
      // console.log(id);
      axios
        .post(
          "http://192.168.2.97:8383/12Trading/getOrder",
          { tab: id,createdate:"2023-07" },
          {
            headers: { Authorization: `Bearer IT_12` },
          }
        )
        .then((response) => {
          this.orders = response.data;
          console.log(this.orders);
        });
    },
    printorder() {
      axios
        .get("http://192.168.2.97:8383", {
          headers: { Authorization: `Bearer IT_12` },
        })
        .then((response) => {});
    },
  },
};
</script>
<style>
.actives {
  color: #3f83f8;
}
</style>
