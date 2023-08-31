import { defineStore } from "pinia";
import axios from "axios";

export const usePocoGetItemMasterStore = defineStore("getItemMaster", {
    state: () => ({
        pocoGetItemMaster: [],
        tabName:'all'
    }),
    actions: {
        setTab(tabName) {
          this.tabName = tabName;
          this.getItemMaster();
        },
      async getItemMaster() {
        try {
            const tabName = this.tabName
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.post(
            import.meta.env.VITE_API_URL +
              "/PurchaseCustomerOrder/item/ItemManage/getItem",
            {
                tab:tabName,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.pocoGetItemMaster = response.data.list;
          // console.log("pocoGETItem", this.pocoGetItem);
        } catch (error) {
          console.log(error);
        }
      },
        async updateStatus(){
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const responseUpdate = await axios.put(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/item/ItemManage/updateStatus",
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } catch (error) {
                console.log(error)
            }
        },
        async updateStatusByItem(productId,status){
            try {
                const pid = productId
                const st = status
                const token = JSON.parse(localStorage.getItem("token"));
                const responseUpdate = await axios.put(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/item/ItemManage/updateStatusByItem",
                    {
                        productid:pid,
                        status:st
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } catch (error) {
                console.log(error)
            }
        },
        async updateDate(){
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const responseUpdate = await axios.put(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/item/ItemManage/upDateLast",
                    {
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } catch (error) {
                console.log(error)
            }
        }

    },
  });