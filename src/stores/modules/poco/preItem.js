import { defineStore } from "pinia";
import axios from "axios";

export const usePocoGetItemStore = defineStore("getItem", {
    state: () => ({
        pocoGetItem: [],
    }),
    actions: {
      async getPreItem() {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.post(
            import.meta.env.VITE_API_URL +
              "/PurchaseCustomerOrder/item/ItemManage/getPreItem",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.pocoGetItem = response.data.list;
          console.log("pocoAddItem", this.pocoGetItem);
        } catch (error) {
          console.log(error);
        }
      },
    },
  });