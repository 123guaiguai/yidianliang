<template>
  <div class="navigation">
    <div class="display">
      <div class="title">
        <!-- <svg class="icon icon-xinliyuandi" aria-hidden="true">
          <use xlink:href="#icon-S_dianhuaxinlizixun"></use>
        </svg> -->
        <img
          src="../../public/icon-网页图标.png"
          alt=""
          class="icon icon-xinliyuandi"
        />
        <h3>心理园地</h3>
      </div>
      <router-link class="navigation-item" style="color: #85c5ff" to="/"
        >首页</router-link
      >
      <div class="breakLine"></div>
      <router-link class="navigation-item" to="/article">阅读</router-link>
      <div class="breakLine"></div>
      <router-link class="navigation-item" to="signal">生理</router-link>
      <div class="breakLine"></div>
      <router-link class="navigation-item" to="psychoTest"
        >心理测试</router-link
      >
      <div class="breakLine"></div>
      <router-link class="navigation-item" to="/chatroom"
        >心理咨询
        <span class="messageCount" v-if="messageCount">
          {{ messageCount }}
        </span>
      </router-link>
      <el-popover
        placement="top-start"
        title=""
        width="250"
        trigger="hover"
        class="person"
      >
        <span>{{
          `进入个人中心${messageCount ? "(您有一条新消息)" : ""}`
        }}</span>
        <svg
          class="icon icon-person"
          aria-hidden="true"
          slot="reference"
          @click="navigate('/personalcenter')"
        >
          <use xlink:href="#icon-gerenzhongxin"></use>
        </svg>
      </el-popover>
      <el-popover
        placement="top-start"
        title=""
        width="200"
        trigger="hover"
        content="进入SOS求救页面"
        class="SOS"
      >
        <svg
          @click="centerDialogVisible = true"
          class="icon icon-SOS"
          aria-hidden="true"
          slot="reference"
        >
          <use xlink:href="#icon-iconhuizong_huaban1fuben22"></use>
        </svg>
      </el-popover>
      <span class="logout" @click="loginout">退出登陆</span>
    </div>
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <div class="flex justify-center relative">
        <img src="/手机壳.jpg" alt="" />
        <div class="sos1 absolute">
          <img
            class="w-full object-cover"
            src="/sos1.png"
            alt="这是求救按钮"
            usemap="#planetmap"
          />
          <map name="planetmap" id="planetmap">
            <area
              shape="circle"
              coords="174,248,143"
              class="cursor-pointer"
              alt="Venus"
              @click="postSOS"
            />
          </map>
          <div
            class="padding flex flex-col items-center justify-around text-white font-extrabold"
          >
            <span>点击立即向主治医师和家人求助！</span>
            <span>我们和你在一起！</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { sendSOS } from "@/request/api/person";
export default {
  data() {
    return {
      centerDialogVisible: false,
    };
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    },
    loginout() {
      localStorage.removeItem("AccessToken"); //清除token缓存
      this.$router.push("/login");
    },
    async postSOS() {
      let data = await sendSOS();
      if (data) {
        this.$message.error("SOS发送成功，坚持住！我们这就赶来！");
      }
    },
  },
  computed: {
    ...mapState(["messageCount"]),
  },
};
</script>

<style lang="less" scoped>
.navigation {
  width: 100%;
  height: 72px;
  background-color: white;
  border-bottom: 1px solid rgb(221, 221, 221);
  display: flex;
  align-items: center;
  justify-content: center;
  .display {
    width: 72%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      display: flex;
      align-items: center;
      height: 100%;
      .icon-xinliyuandi {
        width: 30px;
      }

      h3 {
        font-size: 22px;
        margin-left: 3px;
        color: rgb(85, 85, 85);
        font-family: "PingFang SC", miui, system-ui, -apple-system,
          BlinkMacSystemFont, Helvetica Neue, Helvetica, sans-serif;
        border: 0;
      }
    }
    .person,
    .SOS {
      height: 100%;
      border: 0;
      margin-left: 20px;
      .icon {
        width: 30px;
        height: 100%;
      }
    }
    .navigation-item {
      font-size: 14px;
      height: 72px;
      padding: 0 30px;
      line-height: 72px;
      position: relative;
      .messageCount {
        position: absolute;
        background-color: rgb(243, 91, 91);
        color: white;
        border-radius: 50% 50%;
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        right: -28px;
        top: 20px;
        z-index: 99;
      }
    }
    .navigation-item:hover {
      color: #85c5ff;
      background-color: #f3f4f5;
      cursor: pointer;
    }
    .breakLine {
      height: 25px;
      width: 0;
      border-left: 1px dashed #cccccc;
    }
    .logout {
      font-size: 15px;
      color: #5aa8f0;
      margin-left: 100px;
      cursor: pointer;
    }
  }
}
.sos1 {
  width: 230px;
  transform: translateY(72px);
}
.padding {
  width: 100%;
  height: 82px;
  background-image: linear-gradient(
    to bottom,
    #d24455,
    #da5060,
    #e35c6b,
    #eb6877,
    #f37382
  );
}
</style>