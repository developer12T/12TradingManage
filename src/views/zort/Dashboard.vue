<template>
  <div class="p-4 sm:ml-24">
    <div class="p-4 mt-14">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <Icon icon="mdi:invoice-add" :width="32"/>
            </div>
            <div class="flex flex-col justify-start">
              <span
                class="text-right text-sm text-gray-700 text-md dark:text-gray-50"
              >
                Invoice ล่าสุด
              </span>
              <p
                class="my-0 text-xl font-bold text-right text-gray-800 dark:text-white"
              >
                {{ dashboardData.InvLastno }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 h-32 dark:bg-gray-800">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <Icon icon="icon-park-outline:order" width="32" />
            </div>
            <div class="flex flex-col justify-start">
              <span
                class="text-right text-sm text-gray-700 text-md dark:text-gray-50"
              >
                Co ล่าสุด
              </span>
              <p
                class="my-0 text-xl font-bold text-right text-gray-800 dark:text-white"
              >
                {{ dashboardData.conoLastno }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 h-50 dark:bg-gray-800">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <Icon icon="fluent:person-tag-32-filled" width="32" />
            </div>
            <div class="flex flex-col justify-start">
              <span
                class="text-right text-sm text-gray-700 text-md dark:text-gray-50"
              >
                ลูกค้าล่าสุด
              </span>
              <p
                class="my-0 text-xl font-bold text-right text-gray-800 dark:text-white"
              >
                Shopee : {{ dashboardData.cuscodeOlazLastno }}
              </p>
              <p
                class="my-0 text-xl font-bold text-right text-gray-800 dark:text-white"
              >
                Lazada : {{ dashboardData.cuscodeOspeLastno }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
              <Icon icon="tabler:point-filled" color="#3f83f8" width="35" />
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              ออเดอร์ทั้งหมด
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.CountOrderAll }} รายการ
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-28">
              <div
                class="absolute top-0 left-0 w-full h-2 bg-blue-500 rounded"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <Icon icon="tabler:point-filled" color="#FACA15" width="35" />
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              รอปริ้นใบเสร็จธรรมดา
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.CountOrderWaitPrint }} รายการ
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-28">
              <div
                class="absolute top-0 left-0 w-1/6 h-2 bg-yellow-300 rounded"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <Icon icon="tabler:point-filled" color="#0E9F6E" width="35" />
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              ปริ้นสำเร็จ
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.CountOrderSuccessPrint }} รายการ
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-28">
              <div
                class="absolute top-0 left-0 w-5/6 h-2 bg-green-500 rounded"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <Icon icon="tabler:point-filled" color="#1A56DB" width="35" />
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              สต็อก zort
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.StockZort }} ชิ้น
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-100">
              <div
                class="absolute top-0 left-0 w-3/4 h-2 bg-blue-700 rounded"
              ></div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
          <div class="flex items-center">
            <Icon icon="tabler:point-filled" color="#F05252" width="35" />
            <p class="ml-2 text-gray-700 text-md dark:text-gray-50">
              สต็อก ERP
            </p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
            >
              {{ dashboardData.StockM3 }} ชิ้น
            </p>
            <div class="relative h-2 bg-gray-200 rounded w-28">
              <div
                class="absolute top-0 left-0 w-1/2 h-2 bg-red-500 rounded"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed } from "vue";
import { useDashboardStore } from "../../stores";
import { Icon } from "@iconify/vue";
export default {
  components:{
    Icon
  },
  setup() {
    const store = useDashboardStore();
    const dashboardData = computed(() => {
      return store.zortDashboard;
    });

    onMounted(() => {
      store.getDashboard();
    });

    return {
      dashboardData,
    };
  },
};
</script>
