<template>
  <el-container style="height: 720px; border: 1px solid #eee;">
    <el-aside  style="height: 720px;">
      <PartNav @get-part-code="handleSelect" :nav-list="navList"></PartNav>
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
        <DoctorList :doctors="doctors"></DoctorList>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PartNav from "./PartNav";
import DoctorList from "./DoctorList";
import axios from "axios";
export default {
  name: "forPatient",
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
      navList: [
        { name: "内科", partCode: "0001" },
        { name: "内分泌科", partCode: "00010001" },
        { name: "血液内科", partCode: "00010002" },
        { name: "神经内科", partCode: "00010003" },
        { name: "外科", partCode: "0002" },
        { name: "骨关节科", partCode: "00020001" },
        { name: "心胸外科", partCode: "00020002" },
      ],
      doctors: [{
        id:1,
        name:'钟世镇',
        info:'院士，呼吸病领域专家',
        price:'100',
        image:"zhongshizhen.png",
        availableRegister:[5,8]
      },
        {
          id:2,
          name:'钟南山',
          info:'院士，呼吸病领域专家',
          price:'100',
          image:'zhongnanshan.png',
          availableRegister:[1,1]

        },
        {
          id:3,
          name:'高兴林',
          info:'教授，呼吸病领域专家',
          price:'80',
          image:'gaoxinglin.png',
          availableRegister:[5,2]

        },
        {
          id:4,
          name:'钟世镇',
          info:'院士，呼吸病领域专家',
          price:'100',
          image:'zhongshizhen.png',
          availableRegister:[5,8]

        },
        {
          id:5,
          name:'钟南山',
          info:'院士，呼吸病领域专家',
          price:'100',
          image:'zhongnanshan.png',
          availableRegister:[5,8]

        },
        {
          id:6,
          name:'高兴林',
          info:'教授，呼吸病领域专家',
          price:'80',
          image:'gaoxinglin.png',
          availableRegister:[5,8]

        }],
    }

  },
  methods:{
    handleSelect(index, indexPath) {
      console.log("for patient handleSelect");
      console.log(index);
      this.partCode = index;
      this.getDoctors();
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
    getPart(){
      console.log('enter getPart method');
      axios.get(this.$global_msg.url+"/getpart").then( (response)=>{
        console.log(response);
        this.navList = response.data;
      },function (err){
        console.log(err);
      })
    },
    getDoctors(){
      axios.get(this.$global_msg.url+"/getdoctors/"+this.partCode+"/"+
        this.showDate.getTime()).then( (response)=>{
        console.log(response);
        this.doctors = response.data;
      },function (err){
        console.log(err);
      })
    }
  },
  mounted:function(){
    console.log('mounted');
    this.getPart();
    this.getDoctors();
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
