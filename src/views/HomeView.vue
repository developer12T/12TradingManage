<style>
  footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9999; /* ตั้งค่าค่าดัชนี z เพื่อให้ตัว footer อยู่ด้านบนของเนื้อหาอื่น ๆ */
}
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999; /* ตั้งค่าค่าดัชนี z เพื่อให้ตัว footer อยู่ด้านบนของเนื้อหาอื่น ๆ */
}
.size-icon {
  width:100% ;
}
</style>
<template>
<!-- <h1>{{ sessionData }}</h1> -->

<body class="bg-bule">
  <navbar></navbar>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2 mt-16 ml-10 mr-10" style="box-shadow:  0 0 2px rgba(0, 0, 0, 0.5);">
    <div class="flex items-center justify-between pb-4 pt-3 pl-5 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาระบบ">
        </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ระบบ
                </th>
                <th scope="col" class="px-6 py-3">
                    รายละเอียด
                </th>
                <th scope="col" class="px-6 py-3">
                    สถานะ
                </th>
                <th scope="col" class="px-6 py-3">
                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="../../public/zort.jpg" alt="">
                    <div class="pl-3">
                        <div class="text-base font-semibold">12Trad Manage Zort</div>
                        <div class="font-normal text-gray-500">manage order online</div>
                    </div>  
                </th>
                <td class="px-6 py-4">
                    จัดการการขายออนไลน์
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> พร้อมใช้งาน
                    </div>
                </td>
                <td class="px-6 py-4">
                    <button @click="goToOtherPage" type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-green-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style="border-radius: 30px;">เข้าใช้งาน</button>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="../../public/CreditLimit.png" alt="Jese image">
                    <div class="pl-3">
                        <div class="text-base font-semibold">Credit Limit</div>
                        <div class="font-normal text-gray-500">manage order creditlimit</div>
                    </div>
                </th>
                <td class="px-6 py-4">
                    จัดการรายการขายเกินเครดิตลิมิต
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-yellow-400 mr-2"></div> ปิดปรับปรุง
                    </div>
                </td>
                <td class="px-6 py-4">
                    <!-- <a href="#" type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-green-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style="border-radius: 30px;" >เข้าใช้งาน</a> -->
                    <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-gray-500 rounded-lg" style="border-radius: 30px;" disabled>เข้าใช้งาน</button>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="../../public/Campaign.png" alt="Jese image">
                    <div class="pl-3">
                        <div class="text-base font-semibold">Campaign Credit</div>
                        <div class="font-normal text-gray-500">manage promotion</div>
                    </div>
                </th>
                <td class="px-6 py-4">
                    จัดการรอบใครขายก็รวย
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> ไม่พร้อมใช้งาน
                    </div>
                </td>
                <td class="px-6 py-4">
                  <a href="#" type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-gray-500 rounded-lg" style="border-radius: 30px;" >เข้าใช้งาน</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>


</body>
<footer class="bg-white shadow m-0 dark:bg-gray-800"  style="box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);">
    <div class="w-full mx-auto max-w-screen p-3 md:flex md:items-center md:justify-center">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" class="hover:underline">12Trading</a>. All Rights Reserved.
    </span>
    </div>
</footer>

</template>
<script>
  import Navbar from '../components/navbar.vue'
export default {
  data() {
    return {
      sessionData: ''
    };
  },
  mounted() {
    // อ่านข้อมูลจาก sessionStorage
    this.sessionData = sessionStorage.getItem('token');
  },
  methods: {
  goToOtherPage() {
    this.$router.push('/zort');
  }
},
components: {
      Navbar
    }
};
</script>