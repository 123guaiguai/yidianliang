<template>
  <div class="container">
    <div class="messageWrapper" v-for="(item,index) in message" :key="index">
      <div class="message">
        <svg class="icon icon-huizhang" aria-hidden="true" slot="reference">
          <use xlink:href="#icon-maohuizhang"></use>
        </svg>
        <div class="desc">
          <div class="messageTitle">你有一份心理汇报</div>
          <div class="time">{{ getTime }}</div>
        </div>
        <div class="look" @click="look">
          <span>{{ roll?"收回":"查看" }}</span>
        </div>
      </div>
      <div :class="['messageDetail',roll?'active':'']">
        <div class="resultDisplay">
          <div class="result">心理状态:{{ item.result }}</div>
          <div class="suggestion">{{ item.suggestion }}</div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import getNowDate from "../../utils/getNowDate";
import { mapState,mapMutations } from "vuex";
import {updateReader} from "../../request/api/questionnaire"
export default {
  data() {
    return {
      roll:false
    };
  },
  computed: {
    getTime() {
      return getNowDate();
    },
    ...mapState(['messageCount','message'])
  },
  methods:{
    async look(){
      if(this.roll===false){
        this.updateMessageCount(-1);
        await updateReader();
      }
      this.roll=!this.roll;
    },
    ...mapMutations(['updateMessageCount'])
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #eeeeee;
  width: 100%;
  height: 100vh;
  .messageWrapper {
    background-color: white;
    border-radius: 10px;
    .message {
      width: 100%;
      height: 150px;

      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon-huizhang {
        width: 60px;
        height: 60px;
        flex: 1;
      }
      .desc {
        flex: 5;
        .messageTitle {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .time {
          color: #a69999;
        }
      }
      .look {
        flex: 1;
        span {
          padding: 8px 20px;
          border: 1px solid #108dff;
          border-radius: 10px;
          color: #108dff;
          cursor: pointer;
          transition: all .3s;
          user-select: none;
        }
      }
    }
    .messageDetail{
      display:flex;
      justify-content: space-around;
      align-items: center;
      overflow: hidden;
      height:0;
      transition: all .3s;
      &.active{
        height:113px;
        transition: all .3s;
      }
      .resultDisplay{
        flex:6;
        padding:10px 20px;
        box-sizing: border-box;
        .result,.suggestion{
          margin-bottom:20px;
          color:#108dff;
          font-size:20px;
        }
      }
    }
  }
}
</style>