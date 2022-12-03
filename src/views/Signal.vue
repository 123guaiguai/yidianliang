<template>
  <div class="signal-container">
    <div class="step">
      <div class="step-ring">
        <div class="step-counter"></div>
        <div class="step-time"></div>
      </div>
      <span class="step-show">
        距离 {{ step.distance }} 公里 | 热量 {{ step.heat }} 千卡 | 爬楼
        {{ step.climb }} 米
      </span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xinxikongxin"></use>
      </svg>
    </div>
    <div class="navigation">
      <ul>
        <li @click="showTip('high')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-S_mingyiwenzhengaoxieyazhuanqu1"></use>
          </svg>
          <span>最高血压</span>
        </li>
        <li @click="showTip('low')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-S_mingyiwenzhengaoxieyazhuanqu"></use>
          </svg>
          <span>最低血压</span>
        </li>
        <li @click="showTip('heart')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tubiaozhizuomoban"></use>
          </svg>
          <span>心率</span>
        </li>
        <li @click="showTip('sleep')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shuimian"></use>
          </svg>
          <span>睡眠时间</span>
        </li>
        <li @click="showTip('temp')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wendu"></use>
          </svg>
          <span>温度</span>
        </li>
      </ul>
    </div>
    <div class="heart-rate"></div>
    <div class="blood-rate"></div>
    <div class="sleep-time"></div>
    <lastSignalPanelVue ref="lastSignal" :lastData="lastSignal"></lastSignalPanelVue>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getHeartRate, getLast } from "../request/api/home";
import { getLocalStorage } from "@/utils/localStorageExceed";
import lastSignalPanelVue from "@/components/lastSignalPanel.vue";
export default {
  components:{
    lastSignalPanelVue
  },
  methods: {
    showTip(value){
      if(!this.lock){
        this.updateLock(true);
        this.$refs.lastSignal.showDisplayBox(value);
      }
    },
    async getAllHeartAndBloodRate() {//在这里获取数组数据
      let resData;
      if (!this.userId) {
        const { Id } = getLocalStorage("AccessToken");
        this.updateUserId(Id);
        resData = await getHeartRate({ userId: Id });
      } else {
        resData = await getHeartRate({ userId: this.userId });
      }
      //console.log(resData);
      if (resData.status === 200) {
        //数据初始化
        const heartsAndBloods = resData.data.data; //拿到心率和血压有关数组。进行预处理
        //console.log(heartsAndBloods);
        this.allHeartRate = heartsAndBloods.map((item) => {
          return item.heartRate;
        });
        //console.log("async", this.allHeartRate);
        this.allBloodRate = heartsAndBloods.map((item) => {
          return {
            bloodHighPressure: item.bloodHighPressure,
            bloodLowPressure: item.bloodLowPressure,
            bloodOxygen: item.bloodOxygen,
          };
        });
        this.sleepTime = heartsAndBloods.map((item) => {
          return item.sleepTime;
        });
        this.temperature = heartsAndBloods.map((item) => {
          return item.temperature;
        });
        //console.log(this.allBloodRate);
      } else {
        alert(resData.data.msg);
      }
      this.heartRate();
      this.bloodRate();
      this.sleepRate();
    },
    async getStep() {//在这里获取单次数据
      let resData;
      if (!this.userId) {
        const { Id } = getLocalStorage("AccessToken");
        this.updateUserId(Id);
        resData = await getLast({ userId: Id });
      } else {
        resData = await getLast({ userId: this.userId });
      }
      //console.log(resData);
      const stepData = resData.data.data;
      this.step = {
        climb: stepData.climb,
        distance: stepData.distance,
        steps: stepData.steps,
        exerciseTime: stepData.exerciseTime,
        heat: stepData.heat,
      };
      this.lastSignal = {
        sleepTime: stepData.sleepTime,
        temperature: stepData.temperature,
        heartRate: stepData.heartRate,
        bloodHighPressure: stepData.bloodHighPressure,
        bloodLowPressure: stepData.bloodLowPressure,
      };
      this.$refs.lastSignal.getLastSignal(this.lastSignal);
      this.stepRing();
    },
    stepRing() {
      let chart_counter = this.$echarts.init(
        document.querySelector(".step-counter")
      );
      let chart_time = this.$echarts.init(document.querySelector(".step-time"));
      let option = {
        title: {
          text: "72%",
          textStyle: {
            color: "#ffffff",
            fontSize: 25, //圆环中间文字大小设置
          },
          left: "center",
          top: "center",
        },
        angleAxis: {
          max: 100, // 满分
          clockwise: true, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        polar: {
          center: ["50%", "50%"], //图形在画布中的位置
          radius: "150%", //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "占比",
                value: 72,
                itemStyle: {
                  normal: {
                    color: "#ffffff", //有颜色的环的颜色
                  },
                },
              },
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 18, //环的宽度
            barGap: "-100%", // 两环重叠
            z: 2,
          },
          {
            // 灰色环
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "rgba(249, 169, 86)",
                  shadowColor: "rgba(0, 0, 0, 0.1)",
                  shadowBlur: 2,
                  shadowOffsetY: 2,
                },
              },
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 18,
            barGap: "-100%", // 两环重叠
            z: 1,
          },
        ],
      };
      const { steps, exerciseTime } = this.step;
      option.title.text = steps;
      option.series[0].data[0].value =
        steps >= 10000 ? 100 : parseInt((steps / 10000) * 100);
      chart_counter.setOption(option);
      option.title.text = exerciseTime;
      option.series[0].data[0].value =
        exerciseTime >= 60 ? 100 : parseInt((exerciseTime / 60) * 100);
      chart_time.setOption(option);
    },
    heartRate() {
      let chart_heartRate = this.$echarts.init(
        document.querySelector(".heart-rate")
      );
      let option = {
        title: {
          text: "心率检测",
          padding: [10, 20],
        },
        grid: {
          right: "15%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        xAxis: {
          name: "时间间隔",
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: {
            //设置x轴或y轴的样式
            show: true,
            //设置坐标轴是否显示，默认就是true
            lineStyle: {
              //设置轴线的样
              color: "rgb(179, 203, 247)",
              width: 1,
            },
          },
        },
        yAxis: {
          name: "心率",
          type: "value",
          scale: true,
          axisLine: {
            //设置x轴或y轴的样式
            show: true,
            //设置坐标轴是否显示，默认就是true
            lineStyle: {
              //设置轴线的样
              color: "rgb(179, 203, 247)",
              width: 1,
            },
            splitLine: {
              show: false,
            },
          },
        },
        series: [
          {
            name: "心率",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#051937" },
                  { offset: 0.5, color: "#44C2D2" },
                  { offset: 1, color: "#87C8D1" },
                ]),
              },
            },
            smooth: true,
            markPoint: {
              data: [
                {
                  type: "max",
                },
                {
                  type: "min",
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                },
              ],
            },
          },
        ],
      };
      //console.log("sync", this.allHeartRate);
      option.xAxis.data = this.allHeartRate.map((item, index) => {
        return `第${index}次`;
      });
      option.series[0].data = this.allHeartRate;
      chart_heartRate.setOption(option);
    },
    bloodRate() {
      //创建心率图表
      let chart_bloodRate = this.$echarts.init(
        document.querySelector(".blood-rate")
      );
      let option = {
        color: ["rgb(249, 107, 26)", "rgb(247, 94, 67)", "rgb(92, 8, 8)"],
        title: {
          text: "血压及血氧",
          padding: [10, 20],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["最低血压", "最高血压", "血氧浓度"],
          x: "right",
          y: "20",
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          scale: true,
          type: "value",
        },
        series: [
          {
            name: "最低血压",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
          },
          {
            name: "最高血压",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
          },
          {
            name: "血氧浓度",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
            smooth: true,
          },
        ],
      };
      option.xAxis.data = this.allBloodRate.map((item, index) => {
        return `第${index}次`;
      });
      option.series[0].data = this.allBloodRate.map((item) => {
        return item.bloodLowPressure;
      });
      option.series[1].data = this.allBloodRate.map((item) => {
        return item.bloodHighPressure;
      });
      option.series[2].data = this.allBloodRate.map((item) => {
        return item.bloodOxygen;
      });
      chart_bloodRate.setOption(option);
    },
    sleepRate() {
      let chart_sleepRate = this.$echarts.init(
        document.querySelector(".sleep-time")
      );
      let option = {
        color: ["rgb(15, 189, 192)", "rgb(242, 235, 26)"],
        title: {
          text: "睡眠及体温",
          padding: [10, 20],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["睡眠时间", "体表温度"],
          x: "right",
          y: "20",
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          scale: true,
          type: "value",
        },
        series: [
          {
            name: "睡眠时间",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
          },
          {
            name: "体表温度",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
          },
        ],
      };
      option.xAxis.data = this.sleepTime.map((item, index) => {
        return `第${index}次`;
      });
      option.series[0].data = this.sleepTime;
      option.series[1].data = this.temperature;
      chart_sleepRate.setOption(option);
    },
    ...mapMutations(["updateUserId","updateLock"]),
  },
  mounted() {
    this.getAllHeartAndBloodRate();
    this.getStep();
  },
  created() {},
  data() {
    return {
      step: {}, //记录运动相关的数据
      allHeartRate: [], //记录心率相关的数据
      allBloodRate: [], //记录血压相关的数据
      sleepTime: [], //记录睡眠时间,
      temperature: [], //记录温度
      lastSignal: {}, //用来展示的最近数据
    };
  },
  computed: {
    ...mapState(["userId","lock"]),
  },
};
</script>

<style lang="less" scoped>
.signal-container {
  width: 100%;
  height: 100%;
  background: rgba(242, 242, 244);
  padding: 2px;
  position:relative;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  .step {
    margin: 20px auto;
    width: 420px;
    height: 250px;
    position: relative;
    background-image: linear-gradient(
      to top,
      #ee6909,
      #f27e14,
      #f79122,
      #faa431,
      #feb641
    );
    border-radius: 10px;
    .step-ring {
      width: 80%;
      height: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .step-counter {
        width: 45%;
        height: 80%;
        position: relative;
        &::before {
          content: "步数";
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          color: rgb(240, 221, 202);
        }
        &::after {
          content: "步";
          position: absolute;
          bottom: 25%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          color: rgb(240, 221, 202);
        }
      }
      .step-time {
        width: 45%;
        height: 80%;
        position: relative;
        &::before {
          content: "中高强度";
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          color: rgb(240, 221, 202);
        }
        &::after {
          content: "分钟";
          position: absolute;
          bottom: 25%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          color: rgb(240, 221, 202);
        }
      }
    }
    .step-show {
      display: block;
      width: 300px;
      text-align: center;
      color: rgba(243, 210, 186);
      font-size: 13px;
      margin: 10px auto;
    }
    .icon {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
    }
  }
  .navigation {
    width: 470px;
    height: 100px;
    background: #ffff;
    border-radius: 20px;
    box-shadow: -2px 2px #000 2px;
    margin: 50px auto;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: space-around;
        .icon {
          width: 40px;
          height: 40px;
          margin-left: 6px;
        }
        .icon:hover + span {
          color: #ee6909;
        }
        span {
          display: block;
          text-align: center;
          margin-top: 4px;
          font-size: 13px;
          transition: all 0.3s;
        }
        span:hover {
          color: #ee6909;
          cursor: pointer;
        }
      }
    }
  }
  .heart-rate {
    width: 500px;
    height: 300px;
    margin: 20px auto;
    background: #ffff;
    border-radius: 30px;
    box-shadow: 2px 2px #000 2px 2px;
  }
  .blood-rate {
    width: 420px;
    height: 350px;
    background: #ffff;
    border-radius: 30px;
    box-shadow: 2px 2px #000 2px 2px;
    position: absolute;
    left: 20px;
    bottom: 50px;
  }
  .sleep-time {
    width: 420px;
    height: 350px;
    background: #ffff;
    border-radius: 30px;
    box-shadow: 2px 2px #000 2px 2px;
    position: absolute;
    right: 20px;
    bottom: 50px;
    transition:all .3s
  }
}
</style>