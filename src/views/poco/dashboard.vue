<template>
  <div class="p-4 sm:ml-20">
    <div class="p-4 mt-12">
      สวัสดีครับ ! <br>
      ยินดีตอนรับเข้าสู่ระบบจัดการ ใบสั่งซื้อ
      <button @click="openNewPage">เปิดหน้าใหม่</button>
    </div>
  </div>


</template>
<script>
export default {
  methods: {
    openNewPage() {
      // เปิดหน้าใหม่
      window.open('http://localhost:5173/pocoManage/pdfExport', '_blank');
    }
  }
}
</script>