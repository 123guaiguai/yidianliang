<template>
  <div class="w-full flex h-screen">
    <div
      class="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6"
    >
      <router-link to="/" class="flex mt-10 mb-2 h-16 shrink-0 items-center">
        <img
          src="/icon-网页图标.png"
          title="这是壹点亮治愈中心"
          class="h-8 w-auto"
        />
        <span class="ml-1 text-gray-400">返回壹点亮首页</span>
      </router-link>

      <div class="text-xs font-semibold leading-6 text-gray-400">
        正在咨询的老师：
      </div>

      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li key="{option.id}">
            <router-link
              to="/"
              class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
            >
              <span
                class="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
              >
                <div class="el-icon-user h-4 w-4" />
              </span>

              <span class="truncate">{{counselorList[$route.params.id?$route.params.id-1:0].name}}</span>
            </router-link>
          </li>
          <li>
            <div class="text-xs font-semibold leading-6 text-gray-400">
              历史咨询
            </div>

            <ul class="-mx-2 mt-2 space-y-1">
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                v-for="item in counselorList"
                :key="item.id"
              >
                <div class="introduction">
                  <img :src="item.picturePath" class="head-picture" alt="" />
                  <div class="abstract">
                    <div class="detail">
                      <span class="name">{{ item.name }}</span>
                      <div class="seniority">{{ item.title }}</div>
                      <p class="service">
                        已服务
                        <span class="number">{{ item.servedNumber }}</span>
                        人
                      </p>
                    </div>
                    <div class="desc">
                      {{ item.introduce }}
                    </div>
                  </div>
                  <div class="consultation">咨询我</div>
                </div>
                <li slot="reference">
                  <router-link
                    to="/"
                    class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <span
                      class="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                    >
                      <div class="el-icon-user h-4 w-4" />
                    </span>

                    <span class="truncate">{{ item.name }}</span>
                  </router-link>
                </li>
              </el-popover>
            </ul>
            <span class="inline-block mt-6 text-gray-400">更多功能</span>
            <ul class="mx-2 mt-2 space-y-1">
              <li>
                <router-link
                  to="/"
                  class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                >
                  <span
                    class="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                  >
                    <div class="el-icon-zoom-in h-4 w-4" />
                  </span>

                  <span class="truncate">发现更多咨询师</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/"
                  class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                >
                  <span
                    class="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                  >
                    <div class="el-icon-s-promotion h-4 w-4" />
                  </span>

                  <span class="truncate">查看当前咨询师文章</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/"
                  class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                >
                  <span
                    class="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                  >
                    <div class="el-icon-message-solid h-4 w-4" />
                  </span>

                  <span class="truncate">加急咨询</span>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="-mx-6 mt-auto flex items-center">
            <div
              class="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900"
            >
              <div class="relative h-8 w-8 bg-gray-50">
                <img
                  :src="avatarUrl"
                  alt="zheshi1"
                  class=" w-full h-full rounded-full object-cover"
                />
              </div>

              <span class="sr-only">Your profile</span>
              <div class="flex flex-col">
                <span aria-hidden="true">{{userInfo.username}}</span>
                <span class="text-xs text-gray-400" aria-hidden="true">
                  {{userInfo.address}}
                </span>
              </div>
              <i class="ml-auto el-icon-s-operation cursor-pointer"></i>
            </div>
          </li>
        </ul>
      </nav>
    </div>

    <aside class="max-h-screen container py-16 md:py-12 w-full">
      <router-view />
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["counselorList","avatarUrl","userInfo"]),
  },
  mounted(){
  }
};
</script>

<style scoped lang='less'>
.introduction {
  transition: all 0.2s;
  width: 271px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f0f0f0;
  .head-picture {
    width: 145px;
    height: 145px;
    border-radius: 50%;
    margin-top: 30px;
  }
  .abstract {
    margin-top: 22px;
    width: 196px;
    height: 126px;
    line-height: 18px;
    font-size: 14px;
    color: #666;
    position: relative;
    overflow: hidden;
    .detail {
      transition: opacity 0.1s;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .name {
        margin-bottom: 19px;
        font-size: 22px;
        color: #444;
        font-weight: bold;
      }
      .service {
        font-size: 14px;
        color: #333;
        text-align: center;
        line-height: 1;
        .number {
          font-family: "Arial", "Microsoft Yahei", "Helvetica Neue", Helvetica,
            Arial, PingFang SC, "Hiragino Sans GB", "WenQuanYi Micro Hei",
            sans-serif;
          font-weight: bold;
          color: #ff6621;
        }
      }
    }
    .desc {
      transition: bottom 0.2s;
      position: absolute;
      bottom: -200px;
      width: 100%;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
  }

  .consultation {
    transition: all 0.2s;
    width: 176px;
    height: 40px;
    border: 1px solid #e3e3e3;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 30px;
    margin-top: 30px;
    cursor: pointer;
  }
}
.introduction:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 4px 4px #f3f3f3;
}
.introduction:hover .detail {
  opacity: 0;
}
.introduction:hover .desc {
  bottom: 30px;
}
.introduction:hover .consultation {
  background-color: #1da1f2;
  color: white;
}
</style>