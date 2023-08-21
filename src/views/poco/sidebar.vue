<style scoped>
a:hover .icon {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

a:hover .icon-right {
  transform: translateX(10px);
  transition: transform 0.3s ease;
}

button:hover .icon {
}

.icon-right {
  transition: transform 0.3s ease;
}

.rotate-icon {
  transition: transform 0.3s ease;
}

.rotate-icon.rotate {
  transform: rotate(90deg);
}

</style>
<template>
  <ol class="inline-flex items-center space-x-1 md:space-x-4 mt-16 ml-24">
    <li class="inline-flex items-center">
      <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <span class="ml-2 mr-1 font-bold">
                      สินค้า
                    </span>
        <Icon icon="mingcute:right-fill" width="16" height="16" />

      </a>
    </li>
    <li>
      <div class="flex items-start">
        <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">อัปไฟล์</a>
      </div>
    </li>
  </ol>
  <aside id="default-sidebar"
         aria-label="Sidebar"
         class="fixed top-0 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0">
    <div class="h-full px-3 py-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <div class="text-center align-middle">
            <button
                aria-controls="drawer-navigation"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                data-drawer-show="drawer-navigation" data-drawer-target="drawer-navigation"
                type="button">
              <Icon height="24" icon="bi:list" width="24"/>
            </button>
          </div>
        </li>
        <li class="mt-2">
          <a v-if="currentPage === 'dashboard'"
             class="flex justify-center rounded-lg flex-col items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/dashboard"
             @click="setPage('dashboard')">
            <Icon height="24" icon="tabler:home" width="24" class="icon"/>
            <span style="font-size: 10px">หน้าหลัก</span>
          </a>

          <a v-else
             class="flex items-center p-2 flex-col justify-center rounded-lg group text-gray-800-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/dashboard"
             @click="setPage('dashboard')">
            <Icon height="24" icon="tabler:home" width="24" class="icon"/>
            <span style="font-size: 10px">หน้าหลัก</span>
          </a>
        </li>

        <!--   test     -->
        <li>
          <button v-if="currentPage === 'addProduct' || currentPage === 'manageItem'"
                  aria-controls="dropdownStock"
                  class="flex flex-col items-center w-full p-2 text-base text-blue-700 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  data-collapse-toggle="dropdownStock"
                  type="button"
          >
            <Icon height="24" icon="fluent-mdl2:product-variant" width="24" class="icon"/>
            <span class="flex-1 text-xs text-center whitespace-nowrap">สินค้า</span>
            <Icon height="16" icon="mingcute:down-fill" width="16"/>
          </button>
          <button v-else
                  aria-controls="dropdownStock"
                  class="flex flex-col  items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  data-collapse-toggle="dropdownStock"
                  type="button"
          >
            <Icon height="24" icon="fluent-mdl2:product-variant" width="24" class="icon"/>
            <span class="flex-1 text-xs text-center whitespace-nowrap">สินค้า</span>
            <Icon height="16" icon="mingcute:down-fill" width="16"/>
          </button>
          <ul v-if="currentPage === 'addProduct' || currentPage === 'manageItem'" id="dropdownStock"
              class="py-2 space-y-2">
            <li>
              <a v-if="currentPage === 'addProduct'"
                 class="flex flex-col rounded-lg justify-center items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
                 href="/pocoManage/addProduct"
                 @click="setPage('addProduct')">
                <Icon height="24" icon="icon-park-outline:excel" width="24" class="icon"/>
                <span style="font-size: 10px">อัปไฟล์</span>
              </a>

              <a v-else
                 class="flex flex-col items-center p-2 justify-center rounded-lg group text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
                 href="/pocoManage/addProduct"
                 @click="setPage('addProduct')">
                <Icon height="24" icon="icon-park-outline:excel" width="24" class="icon"/>
                <span style="font-size: 10px">อัปไฟล์</span>
              </a>
            </li>
            <li>
              <a v-if="currentPage === 'manageItem'"
                 class="flex flex-col text-xs items-center w-full p-2 text-blue-600 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                 href="/pocoManage/manageItem"
                 @click="setPage('manageItem')"
              >
                <Icon height="24" icon="uil:setting" width="24" class="icon"/>
                จัดการ</a
              >
              <a v-else
                 class="flex flex-col text-xs items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                 href="/pocoManage/manageItem"
                 @click="setPage('manageItem')"
              >
                <Icon height="24" icon="uil:setting" width="24" class="icon"/>
                จัดการ</a
              >
            </li>
          </ul>
          <ul v-else id="dropdownStock" class="hidden py-2 space-y-2">
            <li>
              <a v-if="currentPage === 'addProduct'"
                 class="flex flex-col rounded-lg justify-center items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
                 href="/pocoManage/addProduct"
                 @click="setPage('addProduct')">
                <Icon height="24" icon="icon-park-outline:excel" width="24" class="icon"/>
                <span style="font-size: 10px">อัปไฟล์</span>
              </a>

              <a v-else
                 class="flex flex-col items-center p-2 justify-center rounded-lg group text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
                 href="/pocoManage/addProduct"
                 @click="setPage('addProduct')">
                <Icon height="24" icon="icon-park-outline:excel" width="24" class="icon"/>
                <span style="font-size: 10px">อัปไฟล์</span>
              </a>
            </li>
            <li>
              <a v-if="currentPage === 'manageItem'"
                 class="flex flex-col text-xs items-center w-full p-2 text-blue-600 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                 href="/pocoManage/manageItem"
                 @click="setPage('manageItem')"
              >
                <Icon height="24" icon="uil:setting" width="24" class="icon"/>
                จัดการ</a
              >
              <a v-else
                 class="flex flex-col text-xs items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                 href="/pocoManage/manageItem"
                 @click="setPage('manageItem')"
              >
                <Icon height="24" icon="uil:setting" width="24" class="icon"/>
                จัดการ</a
              >
            </li>
          </ul>

          <a v-if="currentPage === 'addPO'"
             class="flex flex-col justify-center rounded-lg items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/addPO"
             @click="setPage('addPO')">
            <div class="icon-container">
              <Icon height="24" icon="icon-park-outline:transaction-order" width="24" class="icon"/>
            </div>
            <span style="font-size: 10px">ใบสั่งซื้อ</span>
          </a>

          <a v-else
             class="flex flex-col items-center p-2 justify-center group rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/addPO"
             @click="setPage('addPO')">
            <div class="icon-container">
              <Icon height="24" icon="icon-park-outline:transaction-order" width="24" class="icon"/>
            </div>

            <span style="font-size: 10px">ใบสั่งซื้อ</span>
          </a>
        </li>


      </ul>
    </div>
  </aside>

  <!--  full sidebar-->
  <div id="drawer-navigation"
       aria-labelledby="drawer-navigation-label"
       class="fixed top-0 left-0 pt-2 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
       tabindex="-1">
    <div class="flex flex-row pt-0">
      <button aria-controls="drawer-navigation"
              class="text-gray-400 bg-transparent pr-4 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-drawer-hide="drawer-navigation"
              type="button">
        <Icon height="24" icon="bi:list" width="24"/>
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
            <Icon height="24" icon="tabler:home" width="24" class="icon-right"/>
            <span class="ml-3 icon-right">หน้าหลัก</span>
          </a>

          <a v-else
             class="flex items-center p-2  group text-gray-800-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/dashboard"
             @click="setPage('dashboard')">
            <Icon height="24" icon="tabler:home" width="24" class="icon-right"/>
            <span class="ml-3 icon-right">หน้าหลัก</span>
          </a>
        </li>

        <!--        test -->
        <li>
          <a v-if="currentPage === 'addProduct' || currentPage === 'manageItem' "
             type="button"
             class="flex items-center w-full p-2 text-base text-blue-600 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
             aria-controls="dropdownStock2"
             data-collapse-toggle="dropdownStock2"
          >
            <Icon height="24" icon="fluent-mdl2:product-variant" width="24" class="icon-right"/>
            <span class="ml-3  icon-right">จัดการสินค้า</span>
            <Icon icon="mingcute:down-fill" width="24" height="24" class="ml-12 rotate"/>
          </a>
          <a v-else
             type="button"
             class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
             aria-controls="dropdownStock2"
             data-collapse-toggle="dropdownStock2"
          >
            <Icon height="24" icon="fluent-mdl2:product-variant" width="24" class="icon-right"/>
            <span class="ml-3  icon-right">จัดการสินค้า</span>
            <Icon icon="mingcute:down-fill" width="24" height="24" class="ml-12 rotate-90" />
          </a>
          <ul v-if="currentPage === 'addProduct' || currentPage === 'manageItem' " id="dropdownStock2"
              class="py-2 space-y-2">
            <li>
              <a v-if="currentPage === 'addProduct'"
                 @click="setPage('addProduct')"
                 href="/pocoManage/addProduct"
                 class="flex items-center w-full p-2 text-blue-600 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <Icon height="24" icon="icon-park-outline:excel" width="24" class="icon mr-2"/>
                อัปไฟล์</a
              >
              <a v-else
                 href="/pocoManage/addProduct"
                 @click="setPage('addProduct')"
                 class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <Icon height="24" icon="icon-park-outline:excel" width="24" class="icon mr-2"/>
                อัปไฟล์</a
              >
            </li>
            <li>
              <a v-if="currentPage === 'manageItem'"
                 @click="setPage('manageItem')"
                 href="/pocoManage/manageItem"
                 class="flex items-center w-full p-2 text-blue-600 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <Icon height="24" icon="uil:setting" width="24" class="icon mr-2"/>
                จัดการสินค้า</a
              >
              <a v-else
                 @click="setPage('manageItem')"
                 href="/pocoManage/manageItem"
                 class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <Icon height="24" icon="uil:setting" width="24" class="icon mr-2"/>
                จัดการสินค้า</a
              >
            </li>
          </ul>
          <ul v-else id="dropdownStock2" class="hidden py-2 space-y-2">
            <li>
              <a
                  href="/pocoManage/addProduct"
                  @click="setPage('addProduct')"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <Icon height="24" icon="icon-park-outline:excel" width="24" class="icon mr-2"/>
                อัปไฟล์</a
              >
            </li>
            <li>
              <a
                  href="/pocoManage/manageItem"
                  @click="setPage('manageItem')"
                  class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <Icon height="24" icon="uil:setting" width="24" class="icon mr-2"/>
                จัดการสินค้า</a>
            </li>
          </ul>

          <a v-if="currentPage === 'addPO'"
             class="flex items-center p-2  group text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/addPO"
             @click="setPage('addPO')">
            <Icon height="24" icon="icon-park-outline:transaction-order" width="24" class="icon-right"/>
            <span class="ml-3 icon-right">จัดการใบสั่งซื้อ</span>
          </a>

          <a v-else
             class="flex items-center p-2  group text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-100"
             href="/pocoManage/addPO"
             @click="setPage('addPO')">
            <Icon height="24" icon="icon-park-outline:transaction-order" width="24" class="icon-right"/>
            <span class="ml-3 icon-right">จัดการใบสั่งซื้อ</span>
          </a>
        </li>


      </ul>
    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";
import {initCollapses, initDrawers} from "flowbite";
import {Icon} from '@iconify/vue';
import {usePageStore} from '../../stores'

export default {
  components: {
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
