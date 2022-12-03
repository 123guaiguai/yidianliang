import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',//存储用户标识
    userType:'',//存储用户类型
    lock:false,//用来展示tip
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
      state.lock=value
    }
  },
  actions: {
  },
  modules: {
  }
})
