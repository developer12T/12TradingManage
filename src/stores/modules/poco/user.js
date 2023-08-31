import {defineStore} from "pinia";
import axios from "axios";

export const useUserStore = defineStore("getUser", {
    state: () => ({
        getDataUser: [],
    }),
    actions: {
        async getUserData() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response  = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/user/userManage/getUser",
                    {},
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                this.getDataUser = response.data
                // console.log("date :", this.getDataUser);
            } catch (error) {
                console.log(error);
            }
        },
        async addUserData(userId,userErp,warehouse,role) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response  = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/user/userManage/addUser",
                    {
                        userId:userId,
                        wareHouse:warehouse,
                        role:role,
                        status:'1',
                        userErp:userErp
                    },
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                this.getDataUser = response.data
                console.log("date :", this.getDataUser);
            } catch (error) {
                console.log(error);
            }
        },
        async updateUserData(userId,action,) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response  = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/user/userManage/updateUser",
                    {
                        userId:userId,
                        status:action,
                    },
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                this.getDataUser = response.data
                console.log("date :", this.getDataUser);
            } catch (error) {
                console.log(error);
            }
        },
    },
});