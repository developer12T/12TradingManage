<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <routerView />
</template>

<script>
import { useAuthStore } from "../../stores";
import router from "../../router";
import Header from "../../components/header.vue";
import Sidebar from "./sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push("/");
    }
  },
};
</script>
