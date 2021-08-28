<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{doctor.name}}</span>
    </el-header>

    <el-main>
      <Schedule :doctor-id="doctor.id"></Schedule>
    </el-main>
  </el-container>

</template>

<script>
import Schedule from "./Schedule";
import axios from "axios";
export default {
  name: "forDoctor",
  components: {Schedule},
  props:['id',],
  data(){
    return{
      doctor: {
        id:this.id,
        name:'钟世镇',
        info:'院士，呼吸病领域专家',
        price:'100',
        image:"zhongshizhen.png",
      },
    }
  },
  methods:{
    getDoctor(){
      axios.get(this.$global_msg.url+"/getdoctor/"+this.doctor.id).then( (response)=>{
        console.log(response);
        this.doctor = response.data;
      },function (err){
        console.log(err);
      })
    }

  },
  mounted:function(){
    console.log('forDoctor mounted');
    this.getDoctor();
  },
}
</script>

<style scoped>
.el-header {
  background-color: rgba(0, 200, 156, .6);
  color: #333;
  line-height: 60px;
}
</style>
