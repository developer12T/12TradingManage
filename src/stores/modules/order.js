import { defineStore } from 'pinia';
import axios from "axios";

export const useOrderStore = defineStore('order', {
  state: () => ({
    zortOrder: [],
  }),
  getter: {
    getZortOrder: (state) => state.zortOrder,
  },
  actions: {
    async getOrderZort() {
        try {
          const token = JSON.parse(localStorage.getItem('token'))
          const reponse = await axios.post(
            import.meta.env.VITE_API_BASE_URL+'/zort/rest12Tzort/12Trading/getOrder',{
            // import.meta.env.VITE_API_BASE_URL+'/zort/order/OrderManage/getOrder',{
              page:"all"
            },
            {
              headers: { Authorization: `Bearer ${token}`},
            }
          );
          const result = reponse.data;
          this.zortOrder = result;
          // localStorage.setItem('zortOrder', JSON.stringify(result));
          console.log('orderzort',this.zortOrder);
        } catch (error) {
          console.error(error);
        }
      },
  },
});
