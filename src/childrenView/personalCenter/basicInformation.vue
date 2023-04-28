<template>
  <div class="container">
    <div class="personalInfo">
      <div class="headerPhoto">
        <img :src="headerPhoto" alt="" @error="faultImg"/>
      </div>
      <div class="information">
        <div class="name">
          <span class="iconfont icon-yonghuming"></span>
          <span>{{ name }}</span>
        </div>
        <div class="city">
          <span class="iconfont icon-dingwei"></span>
          <span>{{ city }}</span>
        </div>
        <div class="sex">
          <span class="iconfont icon-xingbie"></span>
          <span>{{ gender }}</span>
        </div>
      </div>
    </div>
    <div class="collect">
      <div class="collectItem">
        <span>0</span>
        <span>文章</span>
      </div>
      <div class="collectItem">
        <span>0</span>
        <span>回答</span>
      </div>
      <div class="collectItem">
        <span>0</span>
        <span>获赞</span>
      </div>
      <div class="collectItem">
        <span>0</span>
        <span>收藏</span>
      </div>
    </div>
    <div class="profile">
      <span>个人简介</span>
      <div class="introduction">{{ introduction }}</div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getUserAvatar } from "../../request/api/person.js";
import { mapState, mapMutations } from "vuex";
import {defaultImgUrl} from "../../source/index"
export default {
  data() {
    return {
      name: "",
      city: "",
      gender: "",
      introduction: "",
      headerPhoto: "",
    };
  },
  methods: {
    async getUserInformation() {
      if (this.userInfo && !this.refresh) {
        const { address, gender, introduce, username, picturePath } =
          this.userInfo;
        this.name = username;
        this.city = address;
        this.introduction = introduce;
        this.gender = gender;
        this.headerPhoto = picturePath
          ? "http://8.130.92.216:8081/common/download?name=" + picturePath
          : defaultImgUrl;
        return;
      }
      let data = await getUserInfo();
      if (data) {
        const { address, gender, introduce, username, picturePath } = data;
        this.name = username;
        this.city = address;
        this.introduction = introduce;
        this.gender = gender;
        this.headerPhoto =
          "http://8.130.92.216:8081/common/download?name=" + picturePath;
        if (!picturePath) {
          this.headerPhoto =
          defaultImgUrl;
          data.picturePath =
          defaultImgUrl;
        }
        this.updateUserInfo(data); //缓存用户信息
        this.updateRefresh(false); //保持刷新
        this.updateAvatarUrl(picturePath);
      } else {
        this.open("用户数据请求失败！");
      }
    },
    open(message) {
      this.$message(message);
    },
    faultImg(){
      this.headerPhoto="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    },
    ...mapMutations(["updateUserInfo", "updateRefresh", "updateAvatarUrl"]),
  },
  computed: {
    ...mapState(["userInfo", "refresh"]),
  },
  mounted() {
    this.getUserInformation();
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  .personalInfo {
    width: 80%;
    display: flex;
    justify-content: space-between;
    .headerPhoto {
      width: 40%;
      height: 200px;
      display: flex;
      justify-content: center;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50% 50%;
        margin-top: 40px;
      }
    }
    .information {
      width: 40%;
      height: 160px;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name,
      .city,
      .sex {
        color: #4d524f;
        font-size: 16px;
        display: flex;
        align-items: center;
        .iconfont {
          color: #999999;
          margin-right: 10px;
        }
      }
    }
  }
  .collect {
    width: 40%;
    height: 60px;
    display: flex;
    margin-top: 10px;
    .collectItem {
      width: 24%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: #1f1111;
      span:first-child {
        font-weight: bold;
      }
    }
  }
  .profile {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-top: 30px;
    //border:1px solid #999;
    border-radius: 10px;
    padding: 10px 10px;
    box-shadow: 2px 2px 6px #ccc;
    margin-bottom: 40px;
    span {
      color: #48a8ff;
    }
    .introduction {
      margin-top: 20px;
      word-wrap: normal;
    }
  }
}
</style>