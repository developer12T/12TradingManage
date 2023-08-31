import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'


import "./index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
// app.component('VueDatePicker', VueDatePicker);
app.mount("#app");
