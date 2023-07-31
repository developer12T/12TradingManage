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
    async getOrderZort() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const pageName = localStorage.getItem("orderPage");
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
            "/zort/rest12Tzort/12Trading/getOrder",
          {
            page: pageName,
            tab: "wait-tab"
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
      } catch (error) {
        console.error(error);
      }
    },
  },
});
