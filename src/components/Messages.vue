<template>
  <div
    id="messages"
    class="flex h-full flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
  >
    <div
      @click="showLoading"
      class="flex justify-center items-center text-sm text-indigo-600 cursor-pointer"
    >
      <div v-if="!isLoading"><i class="el-icon-s-comment mr-1"></i> 查看历史消息</div>
      <i class="el-icon-loading" v-if="isLoading===1"></i>
    </div>

    <template v-if="isLoading === 2">
      <div
        class="chat-message"
        v-for="item in communication"
        :key="item.sendDate"
      >
        <div :class="`flex items-end ${item.type === 1 ? 'justify-end' : ''}`">
          <div
            :class="`flex flex-col space-y-2 text-base max-w-xs mx-2 ${
              item.type === 1 ? 'order-1 items-end' : 'order-2 items-start'
            } `"
          >
            <span
              :class="`px-4 py-2 rounded-lg inline-block bg-gray-300 text-black ${
                item.type === 1
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
              }`"
            >
              {{ item.content }}
              <span class="ml-2 text-xs text-gray-400"> {{item.sendDate.slice(0,10)}} </span>
            </span>
          </div>

          <div
            :class="`relative w-6 h-6 ${
              item.type === 1 ? 'order-2' : 'order-1'
            }`"
          >
            <img
              :src="item.type === 1 ? avatarUrl : counselor.picturePath"
              alt="Profile picture"
              referrerPolicy="no-referrer"
              class="rounded-full object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getCommunicationWithCounselor } from "@/request/api/person";
export default {
  data() {
    return {
      communication: [],
      isLoading: 0, //isLoading的值：0-查看历史消息，1-loading,2-展示消息
    };
  },
  props: ["avatarUrl", "counselor"],
  methods: {
    async getHistoryCommunication() {
      let data = await getCommunicationWithCounselor();
      if (data) {
        this.communication = data;
      }
    },
    showLoading(){
      this.isLoading=1
      setTimeout(()=>{
        this.isLoading=2
      },1000)
    }
  },
  activated(){
    this.getHistoryCommunication();
  }
};
</script>

<style scoped>
</style>