<style xmlns="">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
}

.flash-label {
  animation: flash 5s infinite;
  font-weight: bold;
  color: red;
  font-size: smaller;
}
</style>
<template>
  <div class="p-4 sm:ml-12">
    <div class="p-4 mt-12">
      <div class="ml-8">
        <div class="flex flex-row">
          <div class="w-1/2 flex justify-start flex-col bg-yellow-600">
            <div class="bg-red-500 flex justify-center">เพิ่มรายการ ซ้าย</div>
            <div class="bg-blue-500 flex justify-center mt-1 mb-1 m-2">หัวตาราง</div>
            <div class="bg-gray-500 flex justify-center m-2 mt-0 h-screen">ตาราง</div>
          </div>
          <div class="w-1/2 flex justify-start flex-col bg-green-500">
            <div class="bg-yellow-200 flex justify-center">ใบสั่งซื้อ</div>
            <div class="flex justify-center bg-gray-300 mt-1 mb-1 m-2" >
              <span>คลัง : <input class="bg-yellow-300" /></span>
            </div>
            <div class="flex justify-center bg-red-600 h-screen mt-0 mb-1 m-2" >ตาราง</div>
            <div class="flex justify-end bg-red-600 mt-0 mb-1 m-2" >
              <div class="flex justify-center items-center bg-green-300 w-16 h-8 mr-2" >ปุ่มตกลง</div>
              <div class="flex justify-center items-center bg-yellow-200 w-16 h-8" >ปุ่มยกเลิก</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


export default {};
</script>
