<template>
  <div id="signal-container">
    <div id="display-box">
      <div id="header">
        {{ title }}
        <span id="tip">{{ detail }}</span>
      </div>
      <div id="text">{{ text }}</div>
    </div>
    <div id="cancel" @click="hideDisplayBox">BACK</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      text: "下午避免摄入含咖啡因,晚上不要吸烟避免饮酒助眠\n\n白天适度的体育锻炼有助于入睡,但睡前2-3小时避免高强度体育锻炼\n\n不要在睡前进食大量食物或饮料,尤其是难以消化的食物。",
      title: "最近睡眠时间",
      color: "rgb(240, 99, 71)",
      flag: "", //用来标志在退出时移除哪个类名
      lastSignal: {}, //接收最近一次的生理数据
      detail: "",
    };
  },
  methods: {
    getLastSignal(value) {
      this.lastSignal = value;
    },
    showDisplayBox(value) {
      //只有lock是false是才展示tip页面
      //console.log(this.lastSignal.sleepTime);
      this.lock = true;
      let tip = document.querySelector("#tip");
      switch (value) {
        case "sleep":
          this.color = "rgb(17, 151, 234)";
          this.title = "最近睡眠时间";
          this.detail = this.lastSignal.sleepTime + "小时";
          tip.classList.toggle("linearBlue", true);
          this.flag = "blue";
          break;
        case "heart":
          this.color = "rgb(240, 99, 71)";
          this.title = "最近心率";
          this.detail = this.lastSignal.heartRate + "次/分钟";
          this.text =
            "心率是指正常人安静状态下每分钟心跳的次数,一般为60-100次/分\n\n女性和男性相比,心率值会有所偏高\n\n平时多运动、保持情绪稳定,维持心脏功能良好,心率才能保持健康";
          tip.classList.toggle("linearRed", true);
          this.flag = "red";
          break;
        case "high":
          this.title = "最近最高血压";
          this.detail = this.lastSignal.bloodHighPressure;
          this.text =
            "血压是指血液在血管内流动时作用于单位面积血管壁的侧压力\n\n正常血压的人群日常应注意血压的测量,测量时需定取3次平均值\n\n对于压力较大的人群,应注意调整心态,减少熬夜";
          this.color = "rgb(65, 59, 64)";
          tip.classList.toggle("linearGray", true);
          this.flag = "gray";
          break;
        case "low":
          this.title = "最近最低血压";
          this.detail = this.lastSignal.bloodLowPressure;
          this.text =
            "无论是由于生理或病理原因造成血压收缩压低于100mmHg,那就会形成低血压\n\n低血压患者轻者如无任何症状,无需药物治疗。\n\n当日常治疗无效时,就必须给予药物治疗,减少严重并发症危险";
          this.color = "rgb(249, 64, 237)";
          tip.classList.toggle("linearPurple", true);
          this.flag = "purple";
          break;
        case "temp":
          this.title="最近体温"
          this.detail=this.lastSignal.temperature+"度";
          this.text =
            "体温分级，主要分为低热，中度热，高热和超高热\n\n体温分为低热,中度热,高热和超高热\n\n低热体温一般在37.3到38度之间,中度热,体温一般在38度1至39度之间";
          this.color = "rgb(10, 192, 107)";
          tip.classList.toggle("linearGreen", true);
          this.flag = "green";
          break;
      }
      let container = document.querySelector("#signal-container");
      let cancel = document.querySelector("#cancel");
      let header = document.querySelector("#header");
      cancel.style.borderColor = this.color;
      cancel.style.color = this.color;
      header.style.backgroundColor = this.color;
      container.style.right = 50 + "px";
    },
    hideDisplayBox() {
      let tip = document.querySelector("#tip");
      switch (this.flag) {
        case "blue":
          tip.classList.remove("linearBlue");
          break;
        case "red":
          tip.classList.remove("linearRed");
          break;
        case "gray":
          tip.classList.remove("linearGray");
          break;
        case "purple":
          tip.classList.remove("linearPurple");
          break;
        case "green":
          tip.classList.remove("linearGreen");
      }
      let container = document.querySelector("#signal-container");
      container.style.right = -300 + "px";
      this.updateLock(false);
    },
    ...mapMutations(["updateLock"]),
  },
};
</script>

<style lang="less" scoped>
#signal-container {
  position: absolute;
  width: 300px;
  height: 380px;
  // right: 50px;
  right: -300px;
  top: 10px;
  transition: all 0.3s;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  #display-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    // border-top-left-radius: 20px;
    // border-top-right-radius: 20px;
    #header {
      width: 100%;
      height: 100px;
      background: rgb(240, 99, 71);
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
      position: relative;
      #tip {
        display: block;
        position: absolute;
        width: 80%;
        height: 30px;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        line-height: 30px;
        font-weight: 400;
        font-size: 15px;
        letter-spacing: 2px;
      }
      .linearRed {
        background-image: linear-gradient(
          to right,
          #e35007,
          #e67104,
          #e88e14,
          #e8a92c,
          #e8c246
        );
      }
      .linearBlue {
        background-image: linear-gradient(
          to right,
          #0e53ed,
          #007dff,
          #009eff,
          #00baf7,
          #35d2ec
        );
      }
      .linearPurple {
        background-image: linear-gradient(
          to right,
          #9c14a9,
          #b441bc,
          #cc63d0,
          #e482e4,
          #fba2f8
        );
      }
      .linearGray {
        background-image: linear-gradient(
          to right,
          #4c3646,
          #665261,
          #816f7e,
          #9e8d9b,
          #bbadba
        );
      }
      .linearGreen {
        background-image: linear-gradient(
          to right,
          #19611a,
          #318334,
          #47a74e,
          #5ecd6b,
          #74f489
        );
      }
    }
    #text {
      padding: 0 5px;
      white-space: pre-line;
      color: rgb(137, 132, 132);
      margin-top: 20px;
      letter-spacing: 3px;
    }
  }
  #cancel {
    width: 80%;
    height: 35px;
    border: 2px solid rgb(240, 99, 71);
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(240, 99, 71);
    font-size: 18px;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
    transition: all 0.3s;
  }
}
</style>