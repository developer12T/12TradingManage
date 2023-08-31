<template>
        <div class="flex flex-col-reverse sm:flex-row justify-end items-center mb-4">
        <SearchOrder :searchBar="textInput" @search="handleSearch" />
      </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          
    <TableOrder :columns="tableColumns" :data="filteredItems">
    </TableOrder>
  </table>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useCnmOrderStore } from "../../stores";
import SearchOrder from "../../components/searchbar.vue";
import TableOrder from "../../components/table2.vue";
export default {
  components: {
    SearchOrder,
    TableOrder,
  },
  setup() {
    const tableColumns = computed(() => {
      return [
        { id: "orderdate", title: "วันที่" },
        { id: "orderno", title: "หมายเลขรายการ" },
        { id: "zone", title: "ภาค" },
        { id: "area", title: "เขต" },
        { id: "itemcode", title: "รหัสสินค้า" },
        { id: "itemname", title: "ชื่อสินค้า" },
        { id: "itemqty", title: "จำนวน" },
        { id: "itemunit", title: "หน่วย" },
        { id: "itemprice", title: "ราคา" },
        { id: "itemtype", title: "ประเภท" },
      ];
    });

    const store = useCnmOrderStore();
    const ordersCn = computed(() => {
      return store.cnOrder;
    });

    const textInput = ref("");
    const filteredItems = computed(() => {
      if (!textInput.value) {
        return ordersCn.value;
      }
      const keyword = textInput.value.toLowerCase();
      return ordersCn.value.filter(
        (item) =>
          item.zone.toLowerCase().includes(keyword) ||
          item.area.toLowerCase().includes(keyword) ||
          item.itemcode.toLowerCase().includes(keyword) ||
          item.itemname.toLowerCase().includes(keyword) ||
          item.orderno.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
    };

    onMounted(() => {
      store.getOrderCn();
    });

    return {
      tableColumns,
      ordersCn,
      textInput,
      filteredItems,
      handleSearch,
    };
  },
};
</script>
