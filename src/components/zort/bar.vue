<template>
  <button
    data-drawer-target="sidebar-multi-level-sidebar"
    data-drawer-toggle="sidebar-multi-level-sidebar"
    aria-controls="sidebar-multi-level-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>
  <nav
    class="bg-white border-b border-gray-200 dark:bg-gray-900"

  >
    <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-2 p-3">
      <a href="/logo-onetwo.png" class="flex items-center">
        <img src="/logo-onetwo.png" class="h-8 mr-0" alt="Flowbite Logo" />
        <span class="self-center text-xl whitespace-nowrap dark:text-white" style="font-weight:500;">Zort Manage</span>
      </a>
      
      <div class="flex items-center md:order-2 ">
       
        <button 
          type="button"
          class="flex mr-4 p-1 text-sm bg-white rounded-lg md:mr-0 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 hover:bg-blue-500 items-center"
          id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-4 h-4 rounded-full"
            src="/user.png"
            alt="user photo"
          />
          <div class="ml-2 text-xs text-gray-600" >
          <span style="font-weight:500">นายอาปะจาเห้ อาปาจะหือ</span>
        </div>
        </button>
        
          <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">เปลี่ยนรหัสผ่าน</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ออกจากระบบ</a>
                </li>
              </ul>
          </div>

        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-52 h-screen pt-12 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div
      class="h-full px-0 py-4 overflow-y-auto bg-white-100 dark:bg-gray-800"
    >
      <ul class="space-y-2 font-medium">
        <li :class="{ 'bg-blue-500': isActive === 'zort', 'bg-white': isActive !== 'zort' }" >
            <router-link to="/zort" @click.native="toggleHighlight('zort')" class="w-full flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">Dashboard</span>
        </router-link>
        </li>
        <li :class="{ 'bg-blue-500': isActive === 'orderall', 'bg-white': isActive !== 'orderall' }">
            <router-link to="/orderall" @click.native="toggleHighlight('orderall')" class="w-full flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            ></path>
          </svg>
            <span class="flex-1 flex justify-start ml-3 whitespace-nowrap">รายการ</span>
        </router-link>
        </li>

        <li :class="{ 'bg-blue-500': isActive === 'orderinv', 'bg-white': isActive !== 'orderinv' }">
            <router-link to="/orderinv" @click.native="toggleHighlight('orderinv')" class="w-full flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            ></path>
          </svg>
            <span class="flex-1 flex justify-start ml-3 whitespace-nowrap">ปริ้นใบกำกับภาษี</span>
        </router-link>
        </li>
        

        <li :class="{ 'bg-blue-500': isActive === 'orderRec', 'bg-white': isActive !== 'orderRec' }">
            <router-link to="/orderRec" @click.native="toggleHighlight('orderRec')" class="w-full flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            ></path>
          </svg>
            <span class="flex-1 flex justify-start ml-3 whitespace-nowrap">ปริ้นใบเสร็จ</span>
        </router-link>
        </li>
      
        <li :class="{ 'bg-blue-500': isActive === 'stock', 'bg-white': isActive !== 'stock' }" >
            <router-link to="/stock" @click.native="toggleHighlight('stock')" class="w-full flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
            <span class="flex-1 flex justify-start ml-3 whitespace-nowrap">สต็อกสินค้า</span>
          </router-link>
        </li>

        <!-- <li>
            <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                     <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                  </svg>
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">ออเดอร์</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            <ul id="dropdown-example" class="hidden py-2 space-y-2">
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">ออเดอร์ทั้งหมด</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">ปริ้นใบกำกับภาษี</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">ปริ้นใบเสร็จ</a>
                  </li>
            </ul>
         </li> -->
      </ul> 
    </div>
  </aside>
  
</template>

<script>
export default {
  data() {
    return {
      isActive: null
    };
  },
  mounted() {
    this.checkCurrentRoute();
  },
  methods: {
    toggleHighlight(button) {
      this.isActive = button;
    },
    checkCurrentRoute() {
      const currentRoute = this.$route.path;
      if (currentRoute === '/stock') {
        this.isActive = 'stock';
      } else if(currentRoute === '/orderinv'){
        this.isActive = 'orderinv'
      }else if(currentRoute === '/zort'){
        this.isActive = 'zort'
      }else if(currentRoute === '/orderRec'){
        this.isActive = 'orderRec'
      }else if(currentRoute === '/orderall'){
        this.isActive = 'orderall'
      }else {
        this.isActive = null;
      }
    }
  }
};
</script>
<style>
.btn-highlight {
  background-color: rgb(0, 123, 255);
}
</style>
