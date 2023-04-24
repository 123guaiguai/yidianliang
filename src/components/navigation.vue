<template>
  <div class="navigation">
    <div class="display">
      <div class="title">
        <svg class="icon icon-xinliyuandi" aria-hidden="true">
          <use xlink:href="#icon-S_dianhuaxinlizixun"></use>
        </svg>
        <h3>心理园地</h3>
      </div>
      <span class="navigation-item" style="color: #85c5ff" @click="navigate('/')">首页</span>
      <div class="breakLine"></div>
      <span class="navigation-item">阅读</span>
      <div class="breakLine"></div>
      <span class="navigation-item">生理</span>
      <div class="breakLine"></div>
      <span class="navigation-item">心理测试</span>
      <div class="breakLine"></div>
      <span class="navigation-item">心理咨询</span>
      <el-popover
        placement="top-start"
        title=""
        width="200"
        trigger="hover"
        content="进入个人中心"
        class="person"
      >
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
        <svg class="icon icon-SOS" aria-hidden="true" slot="reference">
          <use xlink:href="#icon-iconhuizong_huaban1fuben22"></use>
        </svg>
      </el-popover>
      <span class="logout">退出登陆</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    },
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
</style>