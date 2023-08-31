<template>
    <Header></Header>
    <SidebarCn></SidebarCn>
    <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <routerView />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../../stores';
import router from "../../router";
import Header from '../../components/header.vue';
import SidebarCn from './sidebar.vue';
export default {
  components: {
    Header,
    SidebarCn,
  },
  setup() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push('/');
    }
  },
};
</script>
