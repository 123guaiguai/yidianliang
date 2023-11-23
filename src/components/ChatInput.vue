<template>
  <div class="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
    <div
      class="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
    >
      <textarea
        class="block border-0 w-full pl-3 resize-none bg-transparent text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        name="chatTextarea"
        id="chatTextarea"
        cols="30"
        min-rows="1"
        style="outline: none"
        placeholder="请敞开心扉与咨询师交流吧"
      ></textarea>

      <!-- <div class="py-2" aria-hidden="true">
        <div class="py-px">
          <div class="h-9" />
        </div>
      </div> -->

      <div
        class="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2"
      >
        <div class="flex-shrin-0">
          <el-button type="primary" :loading="true">上传</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
