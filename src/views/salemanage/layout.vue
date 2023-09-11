<template>
    <HeaderSlm></HeaderSlm>
    <SidebarSlm></SidebarSlm>
    <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../../stores';
import router from '../../router';
// import HeaderSlm from '../../components/header.vue';
import HeaderSlm from '../salemanage/header.vue';
import SidebarSlm from './sidebar.vue';
export default {
  components: {
    HeaderSlm,
    SidebarSlm,
  },
  setup() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      router.push('/');
    }
  },
};
</script>
