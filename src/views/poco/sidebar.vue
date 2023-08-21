<template>
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <div class="text-center align-middle">
            <button
                aria-controls="drawer-navigation"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                data-drawer-show="drawer-navigation" data-drawer-target="drawer-navigation"
                type="button">
              <Icon icon="bi:list" width="24" height="24" />
            </button>
          </div>
        </li>
        <li class="mt-2">
          <a v-if="currentPage === 'dashboard'" class="flex justify-center rounded-lg flex-col items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100" href="/pocoManage/dashboard"
             @click="setPage('dashboard')">
            <Icon icon="tabler:home" width="24" height="24" />
            <span style="font-size: 10px">หน้าหลัก</span>
          </a>

          <a v-else class="flex items-center p-2 flex-col justify-center rounded-lg group text-gray-800-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100" href="/pocoManage/dashboard"
             @click="setPage('dashboard')">
            <Icon icon="tabler:home" width="24" height="24" />
            <span style="font-size: 10px">หน้าหลัก</span>
          </a>
        </li>

        <li>
          <a v-if="currentPage === 'addProduct'" class="flex flex-col rounded-lg justify-center items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100" href="/pocoManage/addProduct"
             @click="setPage('addProduct')">
            <Icon icon="fluent-mdl2:product-variant" width="24" height="24" />
            <span style="font-size: 10px">สินค้า</span>
          </a>

          <a v-else class="flex flex-col items-center p-2 justify-center rounded-lg group text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100" href="/pocoManage/addProduct"
             @click="setPage('addProduct')">
            <Icon icon="fluent-mdl2:product-variant" width="24" height="24" />
            <span style="font-size: 10px">สินค้า</span>
          </a>
        </li>

        <li>
          <a v-if="currentPage === 'addPO'" class="flex flex-col justify-center rounded-lg items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100" href="/pocoManage/addPO"
             @click="setPage('addPO')">
            <Icon icon="icon-park-outline:transaction-order" width="24" height="24" />
            <span style="font-size: 10px">ใบสั่งซื้อ</span>
          </a>

          <a v-else class="flex flex-col items-center p-2 justify-center group rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100" href="/pocoManage/addPO"
             @click="setPage('addPO')">
            <Icon icon="icon-park-outline:transaction-order" width="24" height="24" />
            <span style="font-size: 10px">ใบสั่งซื้อ</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
  <div id="drawer-navigation"
       aria-labelledby="drawer-navigation-label"
       class="fixed top-0 left-0 pt-2 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
       tabindex="-1">
    <div class="flex flex-row pt-0">
      <button aria-controls="drawer-navigation"
              class="text-gray-400 bg-transparent pr-4 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-drawer-hide="drawer-navigation"
              type="button">
        <Icon icon="bi:list" width="24" height="24" />
        <span class="sr-only">Close menu</span>
      </button>
      <a class="flex items-center" href="/pocoManage/dashboard">
        <img alt="12Trading Logo" class="h-8 mr-3" src="/logo-onetwo.png"/>
        <span
            class="self-center text-m font-medium whitespace-nowrap dark:text-white"
        >12Trading</span
        >
      </a>
    </div>
    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <li>
          <a v-if="currentPage === 'dashboard'"
             class="flex items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/dashboard"
             @click="setPage('dashboard')">
            <Icon icon="tabler:home" width="24" height="24" />
            <span class="ml-3">หน้าหลัก</span>
          </a>

          <a v-else
             class="flex items-center p-2  group text-gray-800-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/dashboard"
             @click="setPage('dashboard')">
            <Icon icon="tabler:home" width="24" height="24" />
            <span class="ml-3">หน้าหลัก</span>
          </a>
        </li>

        <li>
          <a v-if="currentPage === 'addProduct'"
             class="flex items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/addProduct"
             @click="setPage('addProduct')">
            <Icon icon="fluent-mdl2:product-variant" width="24" height="24" />
            <span class="ml-3">จัดการสินค้า</span>
          </a>

          <a v-else
             class="flex items-center p-2  group text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/addProduct"
             @click="setPage('addProduct')">
            <Icon icon="fluent-mdl2:product-variant" width="24" height="24" />
            <span class="ml-3">จัดการสินค้า</span>
          </a>
        </li>

        <li>
          <a v-if="currentPage === 'addPO'"
             class="flex items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/addPO"
             @click="setPage('addPO')">
            <Icon icon="icon-park-outline:transaction-order" width="24" height="24" />
            <span class="ml-3">จัดการใบสั่งซื้อ</span>
          </a>

          <a v-else
             class="flex items-center p-2  group text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/addPO"
             @click="setPage('addPO')">
            <Icon icon="icon-park-outline:transaction-order" width="24" height="24" />
            <span class="ml-3">จัดการใบสั่งซื้อ</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {initCollapses, initDrawers} from "flowbite";
import {Icon} from '@iconify/vue';
import { usePageStore } from '../../stores'
export default {
  components:{
    Icon
  },
  setup() {
    const pageStore = usePageStore();
    // let currentPage1 = ref(localStorage.getItem("pocoPage") || "");

    onMounted(() => {
      initCollapses();
      initDrawers();
    });

    // function setPage(pageName) {
    //   // currentPage.value = pageName;
    //   localStorage.setItem("pocoPage", pageName);
    // }
    const currentPage = pageStore.currentPage;
    function setPage(pageName) {
      pageStore.setPage(pageName);
    }

    console.log(currentPage)
    // const currentPage = currentPage1.value

    // console.log(currentPage.value)
    return {
      currentPage,
      setPage
    }
  },
};
</script>
