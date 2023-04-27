<template>
  <div id="login">
    <div class="container">
      <div class="form-box" ref="formBox">
        <!-- 注册 -->
        <div class="register-box hidden" ref="registerBox">
          <h1>register</h1>
          <!-- <input type="text" placeholder="用户名" />
          <input type="email" placeholder="邮箱" />
          <input type="password" placeholder="密码" />
          <input type="password" placeholder="确认密码" /> -->
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名:" prop="username">
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-radio-group v-model="radio">
              <el-radio :label="1">青少年</el-radio>
              <el-radio :label="2">家长</el-radio>
              <el-radio :label="3">医师</el-radio>
            </el-radio-group>
            <!-- <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm', 'register')"
                >注册</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- <button>注册</button> -->
        </div>
        <!-- 登录 -->
        <div class="login-box" ref="loginBox">
          <h1>login</h1>
          <!-- <input type="text" placeholder="用户名" />
          <input type="password" placeholder="密码" /> -->
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名:" prop="username">
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm', 'login')"
                >登录</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- <button>注册</button> -->
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎来到<span>壹点亮</span></h2>
        <p>快来打理你的<span>心理园地</span>吧</p>
        <img src="../assets/1.png" alt="" />
        <p>已有账号</p>
        <button id="login" @click="changeForm('login')">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到<span>壹点亮</span></h2>
        <p>快来打理你的<span>心理园地</span>吧</p>
        <img src="../assets/2.png" alt="" />
        <p>没有账号？</p>
        <button id="register" @click="changeForm('register')">去注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import checkStrength from "../utils/checkPasswordStrength.js";
import { login, register } from "../request/api/user.js";
import { setLocalStorage, getLocalStorage } from "../utils/localStorageExceed";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const { flag, message } = checkStrength(value);
        if (!flag) {
          callback(new Error(message));
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      }
    };
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        // if (this.ruleForm.username !== "") {
        //   this.$refs.ruleForm.validateField("username");
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: validateUserName, trigger: "blur" }],
        //age: [{ validator: checkAge, trigger: "blur" }],
      },
      radio: 1,
    };
  },
  methods: {
    submitForm(formName, type) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //alert("submit!"); //在这里向后端提交表单
          let formData = {
            //提交到后端的表单
            password: this.ruleForm.pass,
            username: this.ruleForm.username,
          };
          let resData; //保存后端返回结果
          if (type === "login") {
            console.log(formData);
            resData = await login(formData);
            console.log(resData);
            if(!resData){
              return this.open("登陆失败！");
            }
          } else {
            formData = { ...formData, userType: this.radio }; //identity为1，2，3,代表学生，家长，医师
            resData = await register(formData);
            if(!resData){
              return this.open("注册失败！");
            }
          }

          //console.log(resData); //下面是处理逻辑
          if (resData==="注册成功！") {
            //处理错误的请求，一般是弹出警告弹窗
            return this.open("注册成功!请登陆");
          } else if(resData.user){
            //把AccessToken和用户标识userToken储存
            const { id, userType } = resData.user;
            setLocalStorage("AccessToken", resData.token, id, userType);
            this.updateUserId(id); //userId储存在vuex中
            this.updateUserType(userType); //userType储存在vuex中
            this.open("登陆成功！");
            this.$router.replace("/"); //跳转到主页面
          }
        } else {
          this.open("表单验证未通过！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeForm(value) {
      // console.log(this.$refs.formBox);
      // console.log(this.$refs.registerBox);
      // console.log(this.$refs.loginBox);
      if (value === "register") {
        this.$refs.formBox.style.transform = "translateX(80%)";
        this.$refs.loginBox.classList.add("hidden");
        this.$refs.registerBox.classList.remove("hidden");
      } else {
        this.$refs.formBox.style.transform = "translateX(0%)";
        this.$refs.registerBox.classList.add("hidden");
        this.$refs.loginBox.classList.remove("hidden");
      }
    },
    open(message) {
      this.$message(message);
    },
    ...mapMutations(["updateUserId", "updateUserType"]),
  },
  computed: {
    ...mapState(["UserId"]),
  },
};
</script>

<style lang="less" scoped>
#login {
  height: 100%;
  /* 弹性布局 水平+垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background: linear-gradient(200deg, #f3e7e9, #e3eeff);
  .container {
    background-color: #fff;
    width: 650px;
    height: 415px;
    border-radius: 5px;
    /* 阴影 */
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    /* 相对定位 */
    position: relative;
    .form-box {
      /* 绝对定位 */
      position: absolute;
      top: -10%;
      left: 5%;
      background-color: #d3b7d8;
      width: 340px;
      height: 500px;
      border-radius: 5px;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      /* 动画过渡 加速后减速 */
      transition: 0.5s ease-in-out;
      .register-box,
      .login-box {
        /* 弹性布局 垂直排列 */
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        h1 {
          text-align: center;
          margin-bottom: 25px;
          /* 大写 */
          text-transform: uppercase;
          color: #fff;
          /* 字间距 */
          letter-spacing: 5px;
        }
        // input {
        //   background-color: transparent;
        //   width: 70%;
        //   color: #fff;
        //   border: none;
        //   /* 下边框样式 */
        //   border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        //   padding: 10px 0;
        //   text-indent: 10px;
        //   margin: 8px 0;
        //   font-size: 14px;
        //   letter-spacing: 2px;
        // }
        // input::placeholder {
        //   color: #fff;
        // }
        // input:focus {
        //   color: #a262ad;
        //   outline: none;
        //   border-bottom: 1px solid #a262ad80;
        //   transition: 0.5s;
        // }
        // input:focus::placeholder {
        //   opacity: 0;
        // }
        button {
          width: 45%;
          margin-top: 35px;
          background-color: #f6f6f6;
          outline: none;
          border-radius: 8px;
          padding: 13px;
          color: #a262ad;
          letter-spacing: 2px;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #a262ad;
          color: #f6f6f6;
          transition: background-color 0.5s ease;
        }
      }
      .hidden {
        display: none;
        transition: 0.5s;
      }
    }
  }
  .con-box {
    width: 50%;
    /* 弹性布局 垂直排列 居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 绝对定位 居中 */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    h2 {
      color: #8e9aaf;
      font-size: 25px;
      font-weight: bold;
      letter-spacing: 3px;
      text-align: center;
      margin-bottom: 4px;
    }
    p {
      font-size: 12px;
      letter-spacing: 2px;
      color: #8e9aaf;
      text-align: center;
    }
    span {
      color: #d3b7d8;
    }
    img {
      width: 150px;
      height: 150px;
      opacity: 0.9;
      margin: 40px 0;
    }
    button {
      margin-top: 3%;
      background-color: #fff;
      color: #a262ad;
      border: 1px solid #d3b7d8;
      padding: 6px 10px;
      border-radius: 5px;
      letter-spacing: 1px;
      outline: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #d3b7d8;
      color: #fff;
    }
  }
  .con-box.left {
    left: -2%;
  }
  .con-box.right {
    right: -2%;
  }
}
</style>
<style>
.el-form-item__label {
  position: absolute;
  left: -0.0625rem;
  text-align: center;
  color: rgb(231, 217, 238);
  font-weight: 700;
  font-family: "Microsoft Yahei";
}
.el-form-item__content {
  margin-left: 40px !important;
  margin-right: 0 !important;
}
#login .container .form-box .register-box button[data-v-26084dc2],
#login .container .form-box .login-box button[data-v-26084dc2] {
  margin-top: 5px;
}
.el-form-item {
  margin-bottom: 30px;
}
.el-radio-group {
  margin-bottom: 25px;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #d4237a;
  background-color: #d4237a;
}
.el-radio__label {
  color: #f9f7f4;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #d4237a;
}
.form-enter-active,
.form-leave-active {
  transition: opacity 0.5s ease;
}
img {
  color: rgb(242, 235, 26);
}
</style>