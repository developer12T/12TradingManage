import { defineStore } from "pinia";
import axios from "axios";

export const useCnmOrderStore = defineStore("order", {
  state: () => ({
    cnOrder: [],
    tabName: '',
  }),
  actions: {
    setTab(tabName) {
      this.tabName = tabName; 
      this.getOrderCn(); 
    },
    async getOrderCn() {
      try {
        // const token = JSON.parse(localStorage.getItem("token"));
        // const pageName = localStorage.getItem("orderPage");
        // const tabName = this.tabName;
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/tohome/CashOrder/order/getOrderCN",
          {
            orderdate: "21/08/2023"
          },
          {
            // headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = response.data;
        this.cnOrder = result;
        console.log("ordercn", this.cnOrder);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
