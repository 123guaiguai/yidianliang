<template>
  <div class="container">
    <div class="inputOld">
      <span>原始密码</span>
      <el-input v-model.trim="oldPassword" placeholder="请输入旧密码" show-password></el-input>
    </div>
    <div class="inputNew">
      <span>新密码</span>
      <el-input v-model.trim="newPassword" placeholder="请输入新密码" show-password></el-input>
    </div>
    <div class="inputRepeat">
      <span>确认密码</span>
      <el-input v-model.trim="repeatPassword" placeholder="确认密码" show-password></el-input>
    </div>
    <div class="emit" @click="emit">确认修改</div>
  </div>
</template>

<script>
import { updatePassword } from "../../request/api/person.js";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    };
  },
  methods: {
    async emit() {
        if(!this.oldPassword||!this.newPassword||!this.repeatPassword){
            return this.open("请填写所有表项！");
        }
        if(this.newPassword!==this.repeatPassword){
            return this.open("密码确认不一致！");
        }
        let data=await updatePassword (this.oldPassword,this.newPassword);
        if(data){
            this.open("修改密码成功！");
        }else{
            this.open("修改密码失败！");
        }
    },
    open(message) {
      this.$message(message);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 80%;
  .inputOld,
  .inputNew,
  .inputRepeat {
    width: 70%;
    margin-left: 40px;
    display: flex;
    padding-top: 40px;
    span {
      width: 100px;
      display: flex;
      align-items: center;
    }
  }
  .emit {
    margin-top: 40px;
    margin-left: 120px;
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: white;
    font-size: 15px;
    background-color: #1ab893;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>