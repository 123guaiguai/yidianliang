import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',//存储用户标识
    userType:'',//存储用户类型
    lock:false,//用来展示tip
    userInfo:null,//用来保存请求得来的用户信息
    refresh:false,//用来控制是再次请求用户信息还是使用缓存
    avatarUrl:"",//保存用户头像地址
    cacheLastSignalData:null,//缓存最新一次的生理数据
    cacheSevenSignalData:null,//缓存最后七天的生理数据
    messageCount:0,//获取未读信息数量
    message:[],//保存消息
    articles:[],//保存文章数据
    counselorList:[],//用来保存咨询师信息
    // step:{
    //   counter:18081,
    //   minute:24,
    //   kilometer:15.61,
    //   kilocalorie:875,
    //   climbing:47.0
    // },
  },
  getters: {
  },
  mutations: {
    updateArticles(state,list){
      state.articles=list;
    },
    updateCounselorList(state,list){
      state.counselorList=list;
    },
    updateMessage(state,val){
      state.message.push(val);
    },
    updateMessageCount(state,val){
      state.messageCount+=val;
      if(state.messageCount<0){
        state.messageCount=0;
      }
    },
    updatecacheLastSignalData(state,val){
      state.cacheLastSignalData=val;
    },
    updatecacheSevenSignalData(state,val){
      state.cacheSevenSignalData=val;
    },
    updateUserId: function (state, value) {
      state.userId = value;
    },
    // updateStep:function(state,value){
    //   state.step={...state.step,value};
    // },
    updateUserType:function(state,value){
      state.userType=value;
    },
    updateLock:function(state,value){
      state.lock=value;
    },
    updateUserInfo(state,val){
      state.userInfo=val;
    },
    updateRefresh(state,val){
      state.refresh=val;
    },
    updateAvatarUrl(state,val){
      state.avatarUrl=process.env.VUE_APP_BASE_URL+"common/download?name="+val;
    }
  },
  actions: {
  },
  modules: {
  }
})
