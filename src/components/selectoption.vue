<template>
  <label class="sr-only" for="underline_select">Underline select</label>
  <select id="underline_select"  v-model="searchInput"
          @change="handleSearch"
          class="block py-2.5 px-2 cursor-pointer w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
    <option value="" selected>เลือกกลุ่มสินค้า (ทั้งหมด)</option>
    <option v-for="val in data" :value="val.value">{{ val.name }}</option>
  </select>
</template>

<script>
export default {
  props: {
    searchBar: {
      type: String,
      default: "",
    },
    data:{
      type:String,
      default: ''
    }
  },
  data() {
    return {
      searchInput: this.searchBar,
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.searchInput);
    },
  },
};
</script>
