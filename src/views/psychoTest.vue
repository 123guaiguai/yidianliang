<template>
  <div class="container">
    <Navigation></Navigation>
    <div class="cardList">
      <div class="card" v-for="(item, index) in questionnaires" :key="index">
        <div class="headerLine"></div>
        <span class="title">{{ item.desc }}</span>
        <div class="test-name">
          <span>{{ item.title }}</span>
          <span :class="['iconfont', item.icon]"></span>
        </div>
      </div>
    </div>
    <div class="context">
      <div
        class="context-item"
        v-for="(item, index) in questionnaires[order].questionList"
        :key="index"
      >
        <div class="title">
          {{ `Q${index + 1} ${item.label} (${typeMap[item.type]})` }}
        </div>
        <!-- 单选题 -->
        <div class="options-radio options" v-if="item.type === 1">
          <el-radio-group v-model="item.value">
            <el-radio
              :label="optionItem.label"
              v-for="(optionItem, optionIndex) in item.options"
              :key="optionIndex"
              >{{ optionItem.value }}</el-radio
            >
          </el-radio-group>
        </div>
        <!-- 多选题 -->
        <div class="options-checkBox options" v-if="item.type === 2"></div>
        <!-- 普通输入 -->
        <div class="options-input options" v-if="item.type === 3"></div>
        <!-- 文本域输入 -->
        <div class="options-textarea options" v-if="item.type === 4"></div>
      </div>
      <div class="submit" @click="submit">提交</div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ report }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Navigation from "../components/navigation.vue";
export default {
  data() {
    return {
      dialogVisible: false,//控制弹出框是否显示
      report:'',//心理评测的结果
      order: 0, //默认选择第一个问卷
      typeMap: ["保留", "单选题", "多选题", "输入", "文本输入"],
      questionnaires: [
        {
          title: "短式青少年抑郁量表测试 (SMFQ)",
          desc: "TEST ONE",
          icon: "icon-xiaoxi",
          questionList: [
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你感到不快或沮丧吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你很难入睡，或者早醒吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你感到疲倦或没有活力吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你感到没有兴趣去做任何事情吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你感到自己很没有价值，或者觉得自己不如别人吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你经常感到焦虑或者紧张吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你经常感到愤怒或者易怒吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你很难集中精力，或者感到自己做事情效率低下吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label:
                "过去两周，你感到生活没有希望，或者觉得自己的未来没有前途吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
            {
              type: 1, //可选有radio单选框1，checkbox多选框2，input输入3，textarea文本输入4
              label: "过去两周，你想过自杀吗?",
              required: true, //是否必选
              value: 0, //保存此问题的结果
              options: [
                {
                  label: 1,
                  value: "从不",
                },
                {
                  label: 2,
                  value: "有时",
                },
                {
                  label: 3,
                  value: "经常",
                },
                {
                  label: 4,
                  value: "总是",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  components: {
    Navigation,
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submit() {
      //提交用户填写表项，获取评分结果
      const submitForm = this.questionnaires[this.order].questionList.map(
        (item) => {
          return {
            value: item.value,
            required: item.required,
          };
        }
      );
      //console.log(submitForm);
      for (let i = 0; i < submitForm.length; i++) {
        let item = submitForm[i];
        if (
          (item.value === 0 && item.required) ||
          (item.value === "" && item.required) ||
          (Array.isArray(item.value) &&
            item.value.length === 0 &&
            item.required)
        ) {
          return this.open(`您有必填项未填！(Q${i + 1})`);
        }
      }
      let score = 0; //最后计算出来的分数
      
      //评分方法后面可以传到后端计算
      submitForm.forEach((item, index) => {
        switch (item.value) {
          case 1:
            score += 0;
            break;
          case 2:
            score += 1;
            break;
          case 3:
            score += 2;
            break;
          case 4:
            score += 3;
            break;
        }
      });
      let report="";
      if(score<=5){
        report="正常"
      }else if(score<=8){
        report="轻度抑郁"
      }else if(score<=11){
        report="中度抑郁"
      }else {
        report="重度抑郁"
      }
      this.report="经过SMFQ测试，你的抑郁状况是："+report;
      this.dialogVisible=true;

    },
    open(message) {
      this.$message(message);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f9fbfc;
  flex-direction: column;
  .cardList {
    margin-top: 40px;
    margin-bottom: 30px;
    .card {
      width: 340px;
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 0 4px 4px #f3f3f3;
      .headerLine {
        width: 100%;
        height: 4px;
        background-color: #22d4bf;
        box-shadow: 0 0 2px 2px #e0f3f0;
        border-radius: 2px;
        margin-bottom: 20px;
      }
      .title {
        color: #6d7886;
        font-weight: 700;
      }
      .test-name {
        color: #6d7886;
        font-weight: 700;
        font-size: 18px;
        display: flex;
        align-items: center;
        .iconfont {
          margin-left: 10px;
          font-size: 20px;
          //background-color: #f9fbfc;
        }
      }
    }
  }
  .context {
    width: 50%;
    min-height: 500px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 4px 4px #f3f3f3;
    margin-bottom: 50px;

    .context-item {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      color: #6d7886;
      font-weight: 700;
      .options {
        margin-left: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .submit {
      width: 120px;
      margin: 30px auto;
      padding: 10px 0;
      text-align: center;
      text-decoration: none;
      color: white;
      background-color: #48a8ff;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>