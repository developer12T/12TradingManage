<template>
  <nav aria-label="Page navigation example">
    <ul class="flex items-center  -space-x-px h-10 text-base">
      <li v-if="currentPage > 1">
        <button
          @click="changePage(currentPage - 1)"
          class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <Icon icon="line-md:arrow-up" width="16" :rotate="3" class="mr-1" />
           ย้อนกลับ
        </button>
      </li>
      <li>
        <span class="mr-3">
          หน้า {{ currentPage }} จาก {{ totalPages }}
        </span>
      </li>
      <li v-if="currentPage < totalPages">
        <button
          @click="changePage(currentPage + 1)"
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            ถัดไป
          <Icon icon="line-md:arrow-up" width="16" :rotate="1" class="ml-1" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>

import {Icon} from "@iconify/vue";

export default {
  components:{
    Icon
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("page-changed", pageNumber);
    },
  },
};
</script>
