import {defineStore} from "pinia";
import axios from "axios";

export const useUserStore = defineStore("getUser", {
    state: () => ({
        getDataUser: [],
        getDataCart:[],
        getDataSelectCart:[],
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
        async getCart() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));

                const response = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/user/userManage/getCart",
                    {
                        usercode:'66097'
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.getDataCart = response.data;
                console.log("pocoGETCart", this.getDataCart);
            } catch (error) {
                console.log(error);
            }
        },
        async getSelectCart() {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/user/userManage/getSelectCart",
                    {
                        usercode:'66097'
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                this.getDataSelectCart = response.data;
                // console.log("pocoGETItem", this.pocoGetItem);
            } catch (error) {
                console.log(error);
            }
        },
        async addCartData(idProduct,qty) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/user/userManage/addCart",
                    {
                        usercode:'66097',
                        procode:idProduct,
                        qty:qty
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // this.getDataCart = response.data;
                // console.log("pocoGETItem", this.pocoGetItem);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCartData(idProduct) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(
                    import.meta.env.VITE_API_URL +
                    "/PurchaseCustomerOrder/user/userManage/deleteCart",
                    {
                        usercode:'66097',
                        procode:idProduct
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // this.getDataCart = response.data;
                // console.log("pocoGETItem", this.pocoGetItem);
            } catch (error) {
                console.log(error);
            }
        },
    },
});