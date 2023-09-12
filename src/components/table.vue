<template>

  <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 "
  >
  <tr>
    <th
        v-for="col in columns"
        :key="col.id"
        scope="col"
        class="px-6 cursor-default py-3 sticky bg-gray-50 top-0 text-center"
    >
      <span class="flex flex-row items-center">{{ col.title }}
      <select
          class="text-xs text-gray-500 bg-transparent border-0 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          v-if="col.options" v-model="col.selectedOption" @change="handleSelectChange(col.selectedOption)">
        <option value="" selected>All</option>
        <option v-for="option in col.options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select></span>
    </th>
  </tr>
  </thead>
  <tbody>
  <tr v-if="data === null || data === undefined || data.length === 0"
      class="bg-white cursor-default border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <td class="px-6 py-4 text-center" :colspan="columns.length">
      ไม่พบข้อมูล
    </td>
  </tr>
  <tr v-else
      v-for="row in data"
      :key="row"
      class="bg-white  cursor-default border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <td v-for="col in columns" :key="col.id" class="px-6 py-4">
      <!--        <td v-for="col in columns" :key="col.id" class="py-2 px-6">-->
      <div class="text-center">
        <slot :name="col.id" :row="row">{{ row[col.id] }}</slot>
      </div>
    </td>
  </tr>
  </tbody>

</template>

<script>
import {data} from "autoprefixer";

export default {
  components: {},
  methods: {
    handleSelectChange(selectedValue) {
      this.$emit("selectChange", selectedValue);
    },
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
