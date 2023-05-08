<template>
  <div class="wrapper">
    <Navigation></Navigation>
    <div class="display">
      <el-container>
        <el-aside width="200px">
          <div class="display-aside">
            <div
              :class="['option', item.title ? 'title' : '']"
              v-for="(item, index) in asideList"
              :key="index"
              @click="changeTitle(item.text, item.title, item.path)"
            >
              <span class="text">{{ item.text }}</span>
              <span :class="['iconfont', item.title ? item.icon : '']"></span>
              <span
                class="messageCount"
                v-if="messageCount && item.text === '消息'"
                >{{ messageCount }}</span
              >
            </div>
          </div>
        </el-aside>
        <el-main>
          <div class="display-main-header">
            {{ showTitle }}
          </div>
          <div class="display-main-show">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/navigation.vue";
import { mapState } from "vuex";
export default {
  components: {
    Navigation: navigation,
  },
  data() {
    return {
      asideList: [
        { title: true, text: "账号信息", icon: "icon-zhanghao" },
        { title: false, text: "基本信息", path: "basicInfor" },
        { title: false, text: "修改信息", path: "modifyInfor" },
        { title: false, text: "更新头像", path: "modifyHeaderPhoto" },
        { title: false, text: "修改密码", path: "modifyPassword" },
        { title: false, text: "绑定手机" },
        { title: true, text: "管理通知", icon: "icon-xiaoxi" },
        { title: false, text: "系统通知" },
        { title: false, text: "消息" ,path:"message"},
        { title: false, text: "评论回答" },
        { title: false, text: "私信聊天" },
        { title: true, text: "我的服务", icon: "icon--fuwu" },
        { title: false, text: "预约订单" },
        { title: false, text: "课程中心" },
        { title: true, text: "内容管理", icon: "icon-neirongguanli" },
        { title: false, text: "我的收藏" },
      ],
      showTitle: "系统通知",
      path: "basicInfor",
    };
  },
  methods: {
    changeTitle(text, title, path) {
      if (title) {
        return;
      }
      this.showTitle = text;
      if (path && this.path !== path) {
        this.path = path;
        this.$router.push(`/personalcenter/${path}`);
      }
    },
  },
  computed:{
    ...mapState(['messageCount'])
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  .display {
    width: 70%;
    padding: 30px 0;
    .display-aside {
      width: 180px;
      background-color: white;
      border-radius: 10px;
      display: flex;
      flex-direction: column;

      .option {
        margin-left: 50px;
        width: 60%;
        height: 60px;
        line-height: 60px;
        position: relative;
        color: #333333;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: #0b8bff;
        }
        &.title {
          font-size: 16px;
          color: #9fa19f;
          margin-top: 40px;
          .iconfont {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -30px;
            font-size: 20px;
          }
          &:first-child {
            margin-top: 0px;
          }
        }
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
          left: -13px;
          top: 13px;
          z-index: 99;
        }
      }
    }
    .display-main-header {
      height: 60px;
      background-color: white;
      line-height: 60px;
      border-radius: 10px;
      font-size: 18px;
      padding-left: 30px;
      color: #9fa19f;
      margin-bottom: 30px;
    }
    .display-main-show {
      background-color: white;
      min-height: 400px;
      border-radius: 10px;
    }
  }
}
</style>