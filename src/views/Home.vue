<template>
  <div id="container">
    <Navigation></Navigation>
    <el-carousel height="290px" loop>
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item" alt="" class="swiperImg" />
      </el-carousel-item>
    </el-carousel>
    <!-- 文章阅读模块 -->
    <div class="article">
      <div class="header">
        <span class="classification index">最新热文</span>
        <span class="classification">心理科普</span>
        <span class="classification">家庭关系</span>
        <span class="classification">人际交往</span>
        <span class="classification">自我觉察</span>
        <span class="classification">更多分类</span>
        <div class="publish">
          <svg class="icon icon-bianjiwenzhang_huaban" aria-hidden="true">
            <use xlink:href="#icon-bianjiwenzhang_huaban"></use>
          </svg>
          <span>发布文章</span>
        </div>
      </div>
      <div class="exhibition">
        <!-- 这里是要v-for循环的 -->
        <router-link
          :to="`/article/${item.id}`"
          class="exhibition-item"
          v-for="item in articlesList"
          :key="item.id"
        >
          <img :src="item.avator" alt="" />
          <div class="text">
            <div class="article-title">
              {{ item.title }}
            </div>
            <div class="article-desc">
              {{ item.content }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 心理医师预约模块 -->
    <div class="counseling-bg">
      <div class="counseling">
        <div class="header">
          <span class="title">心理咨询</span>
          <span class="desc">没有人是一座孤岛，每个人都需要心理咨询</span>
        </div>
        <div class="psychologist">
          <!-- 这里是要v-for渲染的 -->
          <div
            class="introduction"
            v-for="item in counselorList"
            :key="item.id"
          >
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
            <router-link class="consultation" :to="`/chatroom/chat/${item.id}`">咨询我</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 心理测试和生理数据展示模块 -->
    <div class="test-bg">
      <div class="test">
        <div class="header">
          <div class="title">心理测试/健康状况</div>
          <div class="desc">认识自己-了解他人</div>
        </div>
        <div class="main">
          <div class="card">
            <img
              src="https://ossimg.xinli001.com/20171225/16544aa48c890dd77ee4f8d8cadd0cb7.jpg?x-oss-process=image/quality,Q_80"
              alt=""
            />
            <div class="img-bg"></div>
            <div class="test-name">MBTI心理测试</div>
            <div class="desc">
              <span class="icon-free">免费</span>
              <span class="number">1920人测试过</span>
            </div>
            <div class="test-btn" @click="$router.push('/psychoTest')">
              去测试
            </div>
          </div>
          <div class="card">
            <img
              src="https://ossimg.xinli001.com/20180404/c560c148e6994b3ec88a7f665a0388f8.jpg?x-oss-process=image/quality,Q_80"
              alt=""
            />
            <div class="img-bg"></div>
            <div class="test-name">看看自己的健康状况吧</div>
            <div class="desc">
              <span class="icon-free">免费</span>
              <span class="number">1120人已上传</span>
            </div>
            <div class="test-btn" @click="$router.push('/signal')">去看看</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/navigation.vue";
import { sliceStr } from "../utils/sliceStr";
import { mapMutations, mapState } from "vuex";
import { getPsychologicalAssert } from "../request/api/questionnaire";
import {
  getSwiperList,
  getCounselors,
  getArticles,
} from "../request/api/index";
import { articlesList, counselorList, swiperList } from "../source";
import { getUserInfo } from '@/request/api/person';
export default {
  components: {
    Navigation: Navigation,
  },
  data() {
    return {
      swiperList: [],
      articlesList: [],
      counselorList: [],
    };
  },
  methods: {
    async getSwiperList() {
      let data = await getSwiperList();
      // if (this.cacheSwiperList) {
      //   data = this.cacheSwiperList;
      // } else {
      //   data = await getSwiperList();

      //   //缓存轮播图信息
      //   this.updatecacheSwiperList(data);
      // }
      this.swiperList = data;
      // if (data) {
      //   this.swiperList = data;
      // } else {
      //   this.swiperList = swiperList;
      // }
    },
    async getCounselors() {
      let data = await getCounselors();
      // if (this.cacheCounselorList) {
      //   data = this.cacheCounselorList;
      // } else {
      //   data = await getCounselors();
      //   this.updatecacheCounselorList(data);
      // }
      if (data) {
        data.forEach((item) => {
          item.introduce = sliceStr(item.introduce);
        });
        this.counselorList = data;
        this.updateCounselorList(data);
      } else {
        this.counselorList = counselorList;
      }
    },
    async getPsychologicalAssert() {
      let data = await getPsychologicalAssert();
      //console.log(data);
      this.updateMessage(data);
      //console.log(data);
      if (data && !data.isShowed) {
        this.updateMessageCount(1);
      }
      this.updateMessageCount(1);
      //console.log(this.messageCount);
    },
    async getArticles() {
      let data = await getArticles();
      // if (this.cacheArticleList) {
      //   data = this.cacheArticleList;
      // } else {
      //   data = await getArticles();
      //   //缓存最新热文
      //   this.updatecacheArticleList(data);
      //   this.updateArticles(data)
      // }
      if (data) {
        this.articlesList = data;
        this.updateArticles(data);
      }
    },
    async getUserInformation() {
      // if (this.userInfo && !this.refresh) {
      //   const { address, gender, introduce, username, picturePath } =
      //     this.userInfo;
      //   this.name = username;
      //   this.city = address;
      //   this.introduction = introduce;
      //   this.gender = gender;
      //   this.headerPhoto = picturePath
      //     ? process.env.VUE_BASE_URL+"common/download?name=" + picturePath
      //     : defaultImgUrl;
      //   return;
      // }
      let data = await getUserInfo();
      if (data) {
        // const { address, gender, introduce, username, picturePath } = data;
        // this.name = username;
        // this.city = address;
        // this.introduction = introduce;
        // this.gender = gender;
        // this.headerPhoto =
        //   process.env.VUE_APP_BASE_URL + "common/download?name=" + picturePath;
        // if (!picturePath) {
        //   this.headerPhoto = defaultImgUrl;
        //   data.picturePath = defaultImgUrl;
        // }
        this.updateUserInfo(data); //缓存用户信息
        this.updateAvatarUrl(data.picturePath);
      } else {
        this.open("用户数据请求失败！");
      }
    },
    ...mapMutations([
      // "updatecacheArticleList",
      // "updatecacheCounselorList",
      // "updatecacheSwiperList",
      "updateMessageCount",
      "updateMessage",
      "updateArticles",
      "updateCounselorList",
      "updateUserInfo",
      "updateAvatarUrl",
    ]),
  },
  mounted() {
    this.getSwiperList();
    this.getArticles();
    this.getCounselors();
    this.getPsychologicalAssert();
    this.getUserInformation();
  },
  computed: {
    ...mapState([
      // "cacheArticleList",
      // "cacheCounselorList",
      // "cacheSwiperList",
      "messageCount",
    ]),
  },
};
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  .el-carousel {
    width: 100%;
    .el-carousel__item {
      font-size: 14px;
      opacity: 0.75;
      height: 290px;
      margin: 0;
      .swiperImg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .article {
    width: 70%;
    //border: 1px solid red;
    .header {
      width: 100%;
      height: 78px;
      display: flex;
      position: relative;
      align-items: center;
      //border: 1px solid red;
      .classification {
        height: 30px;
        width: 80px;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        box-sizing: border-box;
        margin-right: 15px;
        border: 1px solid transparent;
      }
      .index {
        color: #3a9bff;
        border: 1px solid #3a9bff;
        border-radius: 15px;
      }
      .classification:hover {
        color: #3a9bff;
        border: 1px solid #3a9bff;
        border-radius: 15px;
        cursor: pointer;
      }
      .publish {
        position: absolute;
        right: 0;
        color: #7d726f;
        cursor: pointer;
        display: flex;
        height: 100%;
        align-items: center;
        .icon-bianjiwenzhang_huaban {
          width: 30px;
          margin-right: 5px;
        }
      }
    }
    .exhibition {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .exhibition-item {
        width: 45%;
        height: 133px;
        background-color: #f9f9fa;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 20px;
        img {
          width: 84px;
          height: 84px;
          cursor: pointer;
        }
        .text {
          width: 306px;
          height: 84px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .article-title {
            height: 45%;
            font-size: 15px;
            color: #333;
            font-weight: 700;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            cursor: pointer;
          }
          .article-desc {
            height: 45%;
            font-size: 10px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 18px;
          }
        }
      }
    }
  }
  .counseling-bg {
    background-color: white;
    display: flex;
    justify-content: center;
    width: 100%;
    .counseling {
      width: 70%;
      .header {
        width: 100%;
        height: 68px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 20px;
        .title {
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #0b8bff;
          margin-right: 14px;
        }
        .desc {
          font-size: 16px;
          color: #999;
          transition: all 0.4s;
        }
      }
      .psychologist {
        width: 100%;
        display: flex;
        justify-content: space-between;
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
                  font-family: "Arial", "Microsoft Yahei", "Helvetica Neue",
                    Helvetica, Arial, PingFang SC, "Hiragino Sans GB",
                    "WenQuanYi Micro Hei", sans-serif;
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
      }
    }
  }
  .test-bg {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #f3f4f5;
    height: 600px;
    .test {
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .header {
        width: 100%;
        height: 68px;
        display: flex;
        align-items: flex-end;
        .title {
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #0b8bff;
          margin-right: 30px;
        }
        .desc {
          font-size: 16px;
          color: #999;
        }
      }
      .main {
        width: 60%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .card {
          width: 40%;
          height: 300px;
          position: relative;
          border-radius: 7px;
          box-shadow: -1px 1px 1px 2px #d8d7d7;
          img {
            width: 100%;
            height: 65%;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
          }
          .img-bg {
            width: 100%;
            height: 65%;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #ebdfdf;
            opacity: 0;
            transition: opacity 0.2s;
          }

          .test-name,
          .desc {
            width: 100%;
            padding: 10px 30px;
          }
          .desc {
            display: flex;
            justify-content: space-between;
            .icon-free {
              padding: 3px 12px;
              background-color: #5ed49d;
              color: white;
              font-size: 14px;
              border-radius: 15px;
            }
            .number {
              color: #a6a6a6;
              font-size: 13px;
            }
          }
          .test-btn {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 10px 20px;
            background-color: rgba(123, 123, 121, 0.4);
            color: white;
            border-radius: 5px;
            transition: all 0.2s;
            cursor: pointer;
          }
        }
        .card:hover .img-bg {
          opacity: 0.3;
        }
        .card:hover .test-btn {
          background-color: rgba(29, 161, 242);
        }
      }
    }
  }
}
</style>