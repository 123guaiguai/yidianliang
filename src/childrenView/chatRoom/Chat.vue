<template>
  <div
    class="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]"
  >
    <div
      class="flex sm:items-center justify-between py-3 px-3 border-b-2 border-gray-200"
    >
      <div class="relative flex items-center space-x-4">
        <div class="relative">
          <div class="relative w-8 sm:w-12 h-8 sm:h-12">
            <img :src="avatarUrl" alt="出错了" class=" w-full h-full object-cover rounded-full" />
          </div>
        </div>

        <div class="flex flex-col leading-tight">
          <div class="text-xl flex items-center">
            <span class="text-gray-700 mr-3 font-semibold">
              {{userInfo.username}}
            </span>
          </div>

          <span class="text-sm text-gray-600">{{userInfo.address}}</span>
        </div>
      </div>
    </div>

    <Messages :avatarUrl="avatarUrl" :counselor="counselorList[$route.params.id?$route.params.id:0]" />
    <ChatInput />
  </div>
</template>

<script>
import Messages from "../../components/Messages.vue";
import ChatInput from "../../components/ChatInput.vue";
import { mapState } from 'vuex';
export default {
    components:{
        Messages,
        ChatInput,
    },
    computed:{
      ...mapState(['userInfo','avatarUrl','counselorList'])
    }
};
</script>

<style scoped>
</style>