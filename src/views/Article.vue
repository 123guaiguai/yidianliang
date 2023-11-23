<template>
  <div>
    <Navigation />
    <div
      class="flex justify-center mpt-40 mpb-200"
      style="background-color: #f3f4f5"
    >
      <div
        class="mw-740 mpl-30 mpr-30 mpt-40 bg-white rounded-lg shadow-sm mr-6 mpb-200"
      >
        <div>
          <p class="flex space-x-5 text-sm" style="color: #9999a6">
            <span>{{`#${article.tag}`}}</span>
          </p>
          <p class="font-semibold text-xl ml-2 mt-5 mb-5">
            {{article.title}}
          </p>
          <p
            class="inline-block mpt-1 mpb-1 mpl-10 mpr-10 rounded-md text-sm"
            style="background-color: #ddefff; color: #9999a6"
          >
            情绪调节
          </p>
          <div
            class="mt-4 mb-4 flex space-x-11 text-sm items-center"
            style="color: #9999a6"
          >
            <span>{{`发布时间: ${article.publishDate.slice(0,10)}`}}</span>
            <span>
              <li class="el-icon-thumb"></li>
              <span> {{article.thumb}}赞</span>
            </span>
            <span>
              <li class="el-icon-edit-outline"></li>
              <span> {{article.comment}}评论</span>
            </span>
            <span>
              <li class="el-icon-view"></li>
              <span> {{article.view}}阅读</span>
            </span>
          </div>
        </div>
        <div v-html="blog" class="markdown-body"></div>
      </div>
      <div class="mw-360" style="position: sticky; top: 0">
        <div
          class="flex flex-col items-center box-content mh-300 w-full mpt-50 bg-white rounded-lg shadow-sm"
        >
          <img
            :src="article.avator"
            class="mb-7 rounded-full mw-80 mh-80"
            alt=""
          />
          <p class="text-sm" style="color: #9999a6">
            心理学人都早研究些什么？我来告诉你——
          </p>
          <div class="flex mt-8 cursor-pointer">
            <div
              class="mr-5 mw-104 mh-42 flex justify-center items-center rounded-lg text-white hover:opacity-80"
              style="background-color: #0b8bff"
            >
              为ta点赞
            </div>
            <div
              class="mw-104 mh-42 flex justify-center items-center rounded-lg text-white hover:opacity-80"
              style="background-color: #0b8bff"
            >
              私信
            </div>
          </div>
          <div
            class="w-full mt-7 mh-64 flex space-x-5 justify-center items-center border-t border-gray-300"
            style="color: #0b8bff"
          >
            <span>文章 1122</span>
            <span>回答 0</span>
            <span>获赞 2827</span>
          </div>
        </div>
        <div class="mt-3 w-full px-1 bg-white rounded-lg shadow-sm">
          <img src="../assets/sideBar.png" class="w-full" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/navigation.vue";
import { marked } from "marked";
import { mapState } from "vuex";
export default {
  components: {
    Navigation: navigation,
  },
  data() {
    return {
      article:null,
      blog: "",
    };
  },
  // mounted() {
  //   console.log("qq");
  //   console.log(this.$route.params.id);
  //   this.blog = marked(this.content);
  // },
  activated() {
    let index=this.$route.params.id?this.$route.params.id-1:Math.floor(Math.random() * this.articles.length)
    this.article=this.articles[index]
    this.blog = marked(this.articles[index].content);
  },
  computed: {
    ...mapState(["articles"]),
  },
};
</script>

<style scoped>
.mw-360 {
  position: -webkit-sticky;
  top: 0;
  height: 1200px;
}
</style>