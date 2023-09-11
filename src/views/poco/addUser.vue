<template>
  <div class="p-4 sm:ml-20">
    <div class="p-4 mt-12">
      <div class="justify-end mb-2 flex">
        <button
            class="text-white flex flex-row bg-blue-700 hover:bg-blue-800 font-medium items-center rounded-lg text-sm px-4 py-1 mr-0 mb-2"
            type="button"
            @click="toggleDiv">
          เพิ่มผู้ใช้งาน
          <Icon class="ml-2" color="white" icon="mingcute:down-fill" width="24"/>
        </button>
      </div>

      <transition name="slide">
        <div v-if="isDivVisible" class="p-4 pt-0 mt-1">
          <form method="post"
                @submit.prevent="addUserFrom">
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-6 group">
                <input id="userId" v-model="userId"
                       class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       name="userId"
                       placeholder=" "
                       required type="text"/>
                <label
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    for="floating_first_name">รหัสพนักงาน</label>
              </div>
              <div class="relative z-0 w-full mb-6 group">
                <input id="warehouse" v-model="warehouse"
                       class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       name="floating_last_name"
                       placeholder=" "
                       required type="text"/>
                <label
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    for="warehouse">รหัสคลังสินค้า</label>
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-6 group">
                <select id="role" v-model="role"
                        class="block py-2.5 px-2 cursor-pointer w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        required>
                  <option disabled selected value="">เลือกสิทธิการใช้งาน</option>
                  <option value="dev">dev</option>
                  <option value="admin">admin</option>
                  <option value="manager">manager</option>
                  <option value="supervisor">supervisor</option>
                  <option value="officer">officer</option>
                </select>
                <label
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    for="role">สิทธิการใช้งาน</label>
              </div>
              <div class="relative z-0 mb-6 group flex flex-row">
                <div class="w-1/2">
                  <input id="userErp" v-model="userErp"
                         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         name="floating_company"
                         placeholder=" "
                         type="text"/>
                  <label
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      for="userErp">รหัสพนักงาน (Ref. M3)</label>
                </div>
                <div class="w-1/2 flex align-middle ml-4 items-center justify-end">
                  <button
                      class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-3/4 h-8 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                      type="submit">
                    เพิ่มผู้ใช้งาน
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </transition>
      <div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableItem :columns=tableColumns :data=user>
            <template v-slot:status="{ row }">
              <div>
                <button
                    class="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-full text-sm px-3 py-0.5 text-center mr-1"
                    type="button"
                    @click="editUser(row.userId,row.userErp,row.warehouse,row.role)">
                  แก้ไข
                </button>
                <button
                    v-if="row.status === '1' "
                    class="bg-green-700 hover:bg-green-800 text-white font-medium rounded-full text-sm px-4 py-0.5 text-center"
                    type="button"
                    @click="updateStatusUser(row.userId,row.status)">
                  on
                </button>
                <button v-else
                        class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-4 py-0.5 text-center"
                        type="button"
                        @click="updateStatusUser(row.userId,row.status)">
                  off
                </button>
              </div>
            </template>
          </TableItem>
        </table>
      </div>
      <!-- Main modal -->
      <div v-if="isModal" id="staticModal" aria-hidden="true"
           class="fixed  flex justify-center items-center backdrop-brightness-50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
           data-modal-backdrop="static"
           tabindex="-1">
        <div class="relative w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-2 pl-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-md font-semibold text-gray-900 dark:text-white">
                แก้ไขข้อมูลผู้ใช้งาน
              </h3>
              <button
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  type="button"
                  @click="closeModal">
                <Icon height="28" icon="heroicons:x-mark-20-solid" width="28"/>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div class="grid gap-6 mb-1 md:grid-cols-2">
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="first_name">รหัสพนักงาน</label>
                  <input id="first_name"
                         :value="userIdModal"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder=""
                         required type="text">
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="last_name">รหัสพนักงาน
                    (อ้างอิง M3)</label>
                  <input id="last_name"
                         :value="userErpModal"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="-"
                         required type="text">
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         for="company">รหัสคลัง</label>
                  <input id="company"
                         :value="warehouseModal"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="-"
                         required type="text">
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         for="phone">สิทธิการใช้งาน</label>
                  <input id="phone"
                         :value="roleModal"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         pattern="-"
                         placeholder="-" required type="text">
                </div>
              </div>

            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-3 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  data-modal-hide="staticModal"
                  type="button">
                บันทึก
              </button>
              <button
                  class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  type="button"
                  @click="closeModal">
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import {computed, onMounted, ref} from 'vue';
import {Icon} from '@iconify/vue';
import TableItem from '../../components/table.vue';
import {useUserStore} from '../../stores';
import {initModals} from "flowbite";

export default {
  components: {
    Icon,
    TableItem
  },
  setup() {
    const isDivVisible = ref(false);
    const isModal = ref(false);
    const userId = ref('');
    const warehouse = ref('');
    const role = ref('');
    const userErp = ref('');

    // modal data
    const userIdModal = ref('')
    const userErpModal = ref('')
    const warehouseModal = ref('')
    const roleModal = ref('')

    const tableColumns = computed(() => {
      return [
        {id: 'userId', title: 'รหัสพนักงาน'},
        {id: 'userErp', title: 'รหัสพนักงาน(อ้างอิง M3)'},
        {id: 'warehouse', title: 'รหัสคลังสินค้า'},
        {id: 'role', title: 'สิทธิการใช้งาน'},
        {id: 'loginAt', title: 'เข้าสู่ระบบล่าสุด'},
        {id: 'token', title: 'ลักษณะเฉพาะ'},
        {id: 'status', title: '#'},
      ];
    });
    const getUser = useUserStore();
    const user = computed(() => {
      return getUser.getDataUser;
    });

    onMounted(() => {
      getUser.getUserData();
    });

    const toggleDiv = () => {
      isDivVisible.value = !isDivVisible.value;
    };

    const addUserFrom = async () => {
      console.log(userId.value)
      console.log(warehouse.value)
      console.log(role.value)
      console.log(userErp.value)
      await getUser.addUserData(userId.value, userErp.value, warehouse.value, role.value)

      userId.value = ''
      warehouse.value = ''
      role.value = ''
      userErp.value = ''
      await getUser.getUserData();
    }

    const editUser = (userId, userErp, warehouse, role) => {
      console.log(userId)
      console.log(userErp)
      console.log(warehouse)
      console.log(role)
      userIdModal.value = userId
      userErpModal.value = userErp
      warehouseModal.value = warehouse
      roleModal.value = role

      isModal.value = true
    }

    const closeModal = () => {
      isModal.value = false
    }

    const updateStatusUser = async (userId, action) => {
      console.log(userId)
      console.log(action)
      await getUser.updateUserData(userId, action);
      await getUser.getUserData();

    }

    onMounted(() => {
      initModals()
    });

    return {
      userIdModal,
      userErpModal,
      warehouseModal,
      roleModal,
      isModal,
      user,
      warehouse,
      role,
      userErp,
      userId,
      tableColumns,
      isDivVisible,
      closeModal,
      editUser,
      updateStatusUser,
      addUserFrom,
      toggleDiv
    }
  }

};

</script>
<!--<style scoped>-->
<!--.slide-enter-active, .slide-leave-active {-->
<!--  transition: transform 0.5s ease-in-out;-->
<!--}-->
<!--.slide-enter, .slide-leave-to {-->
<!--  transform: translateY(-50%);-->
<!--}-->
<!--</style>-->