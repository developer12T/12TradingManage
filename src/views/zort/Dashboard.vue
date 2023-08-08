<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
        <div class="flex items-center">
          <span class="relative w-4 h-4 p-2 bg-blue-500 rounded-full">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
             
            </svg>
          </span>
          <p class="ml-2 text-gray-700 text-md dark:text-gray-50">ออเดอร์ทั้งหมด</p>
        </div>
        <div class="flex flex-col justify-start">
          <p
            class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
          >
            {{ dataCount.CountOrderAll }} รายการ
          </p>
          <div class="relative h-2 bg-gray-200 rounded w-28">
            <div
              class="absolute top-0 left-0 w-2/3 h-2 bg-blue-500 rounded"
            ></div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
        <div class="flex items-center">
          <span class="relative w-4 h-4 p-2 bg-yellow-300 rounded-full">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
         
            </svg>
          </span>
          <p class="ml-2 text-gray-700 text-md dark:text-gray-50">รอปริ้นใบเสร็จธรรมดา</p>
        </div>
        <div class="flex flex-col justify-start">
          <p
            class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
          >
          {{ dataCount.CountOrderWaitPrint }} รายการ
          </p>
          <div class="relative h-2 bg-gray-200 rounded w-28">
            <div
              class="absolute top-0 left-0 w-2/3 h-2 bg-yellow-300 rounded"
            ></div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
        <div class="flex items-center">
          <span class="relative w-4 h-4 p-2 bg-green-500 rounded-full">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
           
            </svg>
          </span>
          <p class="ml-2 text-gray-700 text-md dark:text-gray-50">ปริ้นสำเร็จ</p>
        </div>
        <div class="flex flex-col justify-start">
          <p
            class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
          >
          {{ dataCount.CountOrderSuccessPrint }} รายการ
          </p>
          <div class="relative h-2 bg-gray-200 rounded w-28">
            <div
              class="absolute top-0 left-0 w-2/3 h-2 bg-green-500 rounded"
            ></div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-white shadow-lg rounded-2xl w-50 dark:bg-gray-800">
        <div class="flex items-center">
          <span class="relative w-4 h-4 p-2 bg-blue-700 rounded-full">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
           
            </svg>
          </span>
          <p class="ml-2 text-gray-700 text-md dark:text-gray-50">สต็อก zort</p>
        </div>
        <div class="flex flex-col justify-start">
          <p class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white">
          {{ dataCount.StockZort }} ชิ้น  
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
          <span class="relative w-4 h-4 p-2 bg-red-500 rounded-full">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              class="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
           
            </svg>
          </span>
          <p class="ml-2 text-gray-700 text-md dark:text-gray-50">สต็อก ERP</p>
        </div>
        <div class="flex flex-col justify-start">
          <p
            class="my-4 text-xl font-bold text-left text-gray-800 dark:text-white"
          >
          {{ dataCount.StockM3 }} ชิ้น
          </p>
          <div class="relative h-2 bg-gray-200 rounded w-28">
            <div
              class="absolute top-0 left-0 w-2/3 h-2 bg-red-500 rounded"
            ></div>
          </div>
        </div>
      </div>

    </div>
  </div>
  </div>
</template>
<script>
  import axios from 'axios' 
  export default {
        data() {
    return {
      dataCount: [],
    };
  },
  mounted() {
    this.getData();
    // console.log('amount')
  },
  methods: {
    getData() {
       const token = JSON.parse(localStorage.getItem("token"));
      axios.post("http://192.168.2.97:8383/zort/dashboard/getData",{
        // token:token
      },{
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
                this.dataCount = response.data[0];
                console.log(this.dataCount);
            });
        },  
    }
    
   
};
</script>