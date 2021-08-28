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
      <span>{{patient.name}}</span>
    </el-header>

    <el-container style="height: 720px; border: 1px solid #eee;">
      <el-aside  style="height: 720px;">
        <PartNav @get-part-code="handleSelect"></PartNav>
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="8"><el-button type="primary" :disabled="showDate <= dateRange[0]" @click="preDay">前一天</el-button></el-col>
            <el-col :span="8">{{showDate.toLocaleDateString()}}</el-col>
            <el-col :span="8"><el-button type="primary" :disabled="showDate >= dateRange[1]" @click="afterDay">后一天</el-button></el-col>
          </el-row>
        </el-header>
        <el-main>
          <DoctorList :part-code="partCode" :show-date="showDate"></DoctorList>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import PartNav from "./PartNav";
import DoctorList from "./DoctorList";
import axios from "axios";
export default {
  name: "forPatient",
  props:['id',],
  components: {DoctorList, PartNav},
  beforeRouteEnter: (to, from, next)=>{
    console.log("forPatient进入路由前：");
    next();
  },
  data(){
    return{
      dateRange: [new Date(), new Date(new Date().setDate(new Date().getDate()+6))],
      showDate: new Date(),
      partCode: "0",

      patient: {
        id: this.id,
        name: "小明",
        phone: "120120",
        address: "天河区",
      }

    }

  },
  methods:{
    handleSelect(index, indexPath) {
      console.log("for patient handleSelect");
      console.log(index);
      this.partCode = index;
    },
    preDay(){
      this.showDate=this.showDate.setDate(this.showDate.getDate()-1);
      this.showDate=new Date(this.showDate);
      // this.showDate.setDate(this.showDate.getDate()-1);
    },
    afterDay(){
      this.showDate=this.showDate.setDate(this.showDate.getDate()+1);
      this.showDate=new Date(this.showDate);
      // this.showDate.setDate(this.showDate.getDate()-1);
    },

    getPatient(){
      axios.get(this.$global_msg.url+"/getpatient/"+this.patient.id).then( (response)=>{
        console.log(response);
        this.patient = response.data;
      },function (err){
        console.log(err);
      })
    },

  },
  mounted:function(){
    console.log('forPatient mounted');
    this.getPatient();
  },
}
</script>

<style scoped>

.el-header {
  background-color: #d9ecff;
  /*color: #333;*/
  line-height: 60px;
}

.el-aside {
  /*background-color: #b3d8ff;*/
  color: #333;
  height: fit-content;
}



</style>
