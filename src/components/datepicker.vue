<template>
  <VueDatePicker v-model="month" month-picker />
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const month = ref({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
  },
};
</script>
