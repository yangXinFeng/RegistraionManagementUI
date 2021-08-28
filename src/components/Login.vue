<template>
  <div id="login" class="loginToHome">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="患者登录" name="patient">
        <el-form :model="loginForm" ref="loginForm" :rules="loginRules" class="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" name="username" placeholder="请输入用户名/手机号" auto-complete="on"></el-input>
          </el-form-item>

          <el-form-item prop="username">
            <el-input v-model="loginForm.password" name="password" type="password" placeholder="请输入密码" auto-complete="on"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-button type="primary" plain @click="handleRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="医生登录" name="doctor">
        <el-form :model="loginForm" ref="loginForm" :rules="loginRules" class="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" name="username" placeholder="请输入用户名/手机号" auto-complete="on"></el-input>
        </el-form-item>

        <el-form-item prop="username">
          <el-input v-model="loginForm.password" name="password" type="password" placeholder="请输入密码" auto-complete="on"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data(){
    return{
      activeName: 'patient',
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          {
            required: true,

            message: "请输入用户名",

            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }


  },
  methods:{
    handleLogin (){
      this.$refs.loginForm.validate((valid) => {
        if(valid) {
          console.log("validate", valid);
          var api,component;
          if(this.activeName == "doctor"){
            api = "/validatedoctor";
            component = "ForDoctor";
          }else{
            api = "/validatepatient";
            component = "ForPatient"
          }
          axios.post(this.$global_msg.url + api, {
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then((response) => {
            console.log(response);
            if(response.data != -1){
              // console.log("ok");
              this.$router.push({
                name: component,
                params: {
                  id: response.data
                }
              });
            }else{
              this.$message.error("用户名或密码错误");
            }

          }, function (err) {
            console.log(err);
            // this.$message.error("用户名或密码错误");
          })
        }
      })
    },

    handleClick(tab, event) {
      console.log(tab, event);
      this.loginForm.username = '';
      this.loginForm.password = '';
    },

    handleRegister(){

    }
  },
}
</script>

<style scoped>
.el-input {
  width:300px;
}
.loginToHome {
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  height: 260px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #dcdfe6;
}
.loginForm {
  text-align: center;
  padding-top: 15px;
  padding-right: 30px;
  top: 10px;
}

</style>
