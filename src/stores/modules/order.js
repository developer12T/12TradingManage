import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    zortOrder: [],
  }),
  getter: {
    getZortOrder: (state) => state.zortOrder,
  },
  actions: {
    setTab(tabName) { 
      this.zortOrder = []; // รีเซ็ต zortOrder เป็นค่าว่าง เพื่อให้ค่าที่เก็บใน zortOrder เปลี่ยนตาม tabName ที่ถูกเลือกใหม่
      this.tabName = tabName; // กำหนดค่า tabName ให้เป็นค่าที่เลือกใหม่
      this.getOrderZort(); // เรียก getOrderZort เพื่อดึงข้อมูลใหม่สำหรับ tab ใหม่ที่เลือก
    },
    async getOrderZort() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const pageName = localStorage.getItem("orderPage");
        const tabName = this.tabName;
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/rest12Tzort/12Trading/getOrder",
          {
            page: pageName,
            tab: tabName
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = reponse.data;
        this.zortOrder = result;
        // localStorage.setItem('zortOrder', JSON.stringify(result));
        console.log("orderzort", this.zortOrder);
        console.log("orderpage", pageName);
        console.log("orderpage", tabName);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
