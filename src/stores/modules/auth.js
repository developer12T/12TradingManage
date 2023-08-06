import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth',{
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token: JSON.parse(localStorage.getItem('token')),
  }),
  getters: {
    isLoggedIn: (state) => state.user,
  },
  actions: {
    async login(userLogin, passwordLogin) {
      try {
        const reponse = await axios.post(
          import.meta.env.VITE_API_BASE_URL+'/12Trading/login',
          { username: userLogin, 
            password: passwordLogin 
          },
          {
            headers: { 'Content-Type': 'application/json'},
          }
        );
        const user = reponse.data;
        this.user = user;
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(user.token));
        console.log('login',user);
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});
