<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <Icon icon="line-md:search" width="20" />
    </div>
    <input
      type="text"
      id="table-search"
      v-model="searchInput"
      @input="handleSearch"
      class="block p-2 pl-10 text-sm text-gray-900 border-gray-300 rounded-lg w-80 bg-gray-50"
      placeholder="ค้นหา . . . "
    />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
  components:{
    Icon
  },
  props: {
    searchBar: {
      type: String,
      default: "",
    },
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
