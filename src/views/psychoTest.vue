<template>
  <div class="test_container">
    <Navigation></Navigation>
    <div class="cardList">
      <div class="card" v-for="(item, index) in questionnaires" :key="index" @click="changeQuestionnaire(item.id)">
        <div
          class="headerLine"
          :style="{ 'background-color': item.color }"
        ></div>
        <span class="title">{{ item.description }}</span>
        <div class="test-name">
          <span>{{ item.title }}</span>
          <span :class="['iconfont', item.icon]"></span>
        </div>
      </div>
    </div>
    <div class="context">
      <div
        class="context-item"
        v-for="(item, index) in getQuestionList"
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
      <div class="submitWrapper">
        <div class="submit" @click="submit">提交</div>
        <div class="reset" @click="reset">重置</div>
      </div>
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
import {getQuestionnaires,getResult} from "../request/api/questionnaire"
export default {
  data() {
    return {
      dialogVisible: false, //控制弹出框是否显示
      report: "", //心理评测的结果
      order: 1, //默认选择第一个问卷,也是问卷的id
      typeMap: ["保留", "单选题", "多选题", "输入", "文本输入"],
      questionnaires:[{questionList:[]}],//心理模板自测
    };
  },
  components: {
    Navigation,
  },
  computed: {
    getQuestionList() {
      return this.questionnaires[this.order-1].questionList;
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    reset(){
      this.questionnaires[this.order].questionList.forEach((item,index,arr)=>{
        if(item.type=1){
          item.value=0;
        }else if(item.type=2){
          item.value=[];
        }else{
          item.value='';
        }
      })
      console.log(this.questionnaires[this.order].questionList)
    },
    async submit() {
      //提交用户填写表项，获取评分结果
      const submitForm = this.questionnaires[this.order-1].questionList.map(
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
      let data=await getResult({
        id:this.order,
        values:submitForm.map(item=>item.value)
      });
      if(!data){
        return this.open("心理测试结果获取失败！");
      }
      this.report =  data;
      this.dialogVisible = true;
    },
    async initQuestionnaires(){
      let data=await getQuestionnaires();
      console.log(data);
      this.questionnaires=data;
    },
    changeQuestionnaire(id){
      this.order=id;
    },
    open(message) {
      this.$message(message);
    },
  },
  mounted(){
    this.initQuestionnaires();
  }
};
</script>

<style lang="less" scoped>
.test_container {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f9fbfc;
  flex-direction: column;
  .cardList {
    margin-top: 40px;
    margin-bottom: 30px;
    display:flex;
    .card {
      width: 340px;
      margin-right:40px;
      cursor:pointer;
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 0 4px 4px #f3f3f3;
      .headerLine {
        width: 100%;
        height: 4px;
        //background-color: #22d4bf;
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
    .submitWrapper{
      display:flex;
      justify-content: center;
      margin-bottom: 40px;
    .submit,.reset {
      margin-left:30px;
      width: 120px;
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
}
</style>