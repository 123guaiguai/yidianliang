<template>
  <div class="container">
    <div class="name">
      <span>用户名</span>
      <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
    </div>
    <div class="address">
      <span>所在城市</span>
      <!-- options 可选项数据源，键名可通过 Props 属性配置 array -->
      <!-- change 当选中节点变化时触发 -->
      <el-cascader
        size="large"
        :options="options"
        v-model="selectedOptions"
        @change="handleChange"
      />
    </div>
    <el-input
      v-model="formData.address"
      placeholder="请填写面对面咨询地址"
      class="spot"
    ></el-input>
    <div class="sex">
      <span>性别</span>
      <el-radio v-model="formData.sex" label="1" class="sexRadio">男</el-radio>
      <el-radio v-model="formData.sex" label="2" class="sexRadio">女</el-radio>
    </div>
    <div class="profile">
      <span>我的简介</span>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        placeholder="请输入内容"
        v-model="formData.profile"
      >
      </el-input>
    </div>
    <el-button class="submit" @click="submit">确认修改</el-button>
  </div>
</template>
  
  <script type="text/javascript">
// import { provinceAndCityData, CodeToText } from 'element-china-area-data' // 1.省市不带‘全部’的二级联动
// import { provinceAndCityDataPlus, CodeToText } from 'element-china-area-data'// 2.省市带‘全部’的二级联动
// import { regionData, CodeToText } from 'element-china-area-data' // 3.省市区不带‘全部’三级联动选择
import { regionDataPlus, CodeToText } from "element-china-area-data"; // 4.省市区带‘全部’三级联动选择
import {updateUserInfo} from "../../request/api/person.js"
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // options: provinceAndCityData, // 1.省市不带‘全部’的二级联动
      // options: provinceAndCityDataPlus, // 2.省市带‘全部’的二级联动
      // options: regionData, // 3.省市区不带‘全部’三级联动选择
      options: regionDataPlus, // 4.省市区带‘全部’三级联动选择
      selectedOptions: [],
      formData: {
        name: "", //保存用户名
        address: "", //保存面对面咨询地址
        sex: "", //保存性别，1是男生，2是女生
        loc: "", //保存所在城市
        profile: "", //保存我的简介
      },
    };
  },
  methods: {
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      this.formData.loc = loc;
      //console.log(loc); // 输出区域码所对应的属性值即中文地址
    },
    async submit() {
      for (let k in this.formData) {
        if (this.formData[k] === "") {
          return this.open("你还有未填项!");
        }
      }
      //提交信息
      let data=await updateUserInfo({
        address:this.formData.loc+this.formData.address, 
        gender:Number(this.formData.sex)===1?"男":"女",
        introduce:this.formData.profile, 
        username:this.formData.name
      })
      if(data==='修改成功'){
        this.open("修改信息成功");
        this.updateRefresh(true);
      }else{
        this.open("修改信息失败");
      }
    },
    open(message) {
      this.$message(message);
    },
    ...mapMutations(['updateRefresh'])
  },
};
</script>
  
  <style  scoped lang="less">
.container {
  width: 80%;
  padding-bottom: 20px;
  .name,
  .address,
  .sex,
  .profile {
    width: 70%;
    margin-left: 40px;
    display: flex;
    padding-top: 40px;
    span {
      width: 100px;
      display: flex;
      align-items: center;
    }
    .sexRadio {
      display: flex;
      align-items: center;
    }
  }
  .profile {
    span {
      display: flex;
      align-items: flex-start;
    }
  }
  .spot {
    width: 50%;
    margin-left: 140px;
    margin-top: 10px;
  }
  .submit {
    width: 120px;
    padding: 10px 0;
    text-align: center;
    background-color: #48a8ff;
    color: white;
    border-radius: 10px;
    margin-left: 120px;
    margin-top: 40px;
    cursor: pointer;
  }
}
</style>
  