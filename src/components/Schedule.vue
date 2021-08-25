<template>
  <div>
    <el-calendar>
      <template slot="dateCell" slot-scope="{date, data}" class="calItem" >
        <div  @click="formData.data = data.day" :class="{ active: data.isSelected }">
<!--          <div class="dayItem">{{ data.day.split('-').slice(2).join('-') }}</div>-->

          <el-row :gutter="10" >
            <el-col :span="8" style="text-align: center">
              <p class="dayItem"  v-if="data.day.substr(-2) < 10">{{ data.day.substr(-1)}}</p>
              <p class="dayItem"  v-else>{{ data.day.substr(-2)}}</p>

            </el-col>
            <el-col :span="16" style="text-align: right" >
              <div v-for="(item,index) in calendarData" :key="index" v-show="!data.isSelected">
                <div v-if="(item.years)==(data.day.split('-').slice(0)[0])
                  && (item.months)==(data.day.split('-').slice(1)[0])
                  && (item.days)==(data.day.split('-').slice(2).join('-'))">
                  <!--              <el-tooltip  placement="bottom-start">-->
                  <div style = "position:relative;right: 0;top:0">
                    <div class="mark" v-if="item.schedule[0]!=0">上午：{{item.available[0]}}/{{item.schedule[0]}}</div>
                    <div class="mark" v-if="item.schedule[1]!=0">下午：{{item.available[1]}}/{{item.schedule[1]}}</div>
                  </div>
                  <!--              </el-tooltip>-->
                </div>
                <div v-else></div>
              </div>

              <div v-show="data.isSelected">
                <i class="el-icon-circle-plus-outline" style="font-size: 50px;color: rgba(0, 200, 156, 1)" @click="dialogVisible = true"/>
                <i class="el-icon-s-custom" style="font-size: 50px;color: rgba(0, 200, 156, 1)" @click="dialogVisible2 = true" />
              </div>
            </el-col>
          </el-row>


        </div>
      </template>
    </el-calendar>
    <el-dialog
      :title="formData.data"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form @submit.native.prevent>
        <el-form-item label="上午">
          <el-input v-model="formData.num1"></el-input>
        </el-form-item>
        <el-form-item label="下午">
          <el-input v-model="formData.num2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false;add()">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "schedule",
  // props:{
  //   "doctorId": 1,
  // },
  data(){
    return {
      formData:{
        data:'',
        num1: 0,
        num2: 0,
      },
      doctorId: 1,
      isHover: new Array(32).fill(false),
      dialogVisible: false,
      calendarData: [
        { years: ['2021'], months: ['08'],days: ['14'],schedule: [6,7,0],available:[1,1,0] },
        { years: ['2021'], months: ['10'], days: ['02'],schedule: [6,4,0],available:[0,1,0]},
        { years: ['2021'], months: ['11'], days: ['02'],schedule: [1,3,0],available:[0,2,0] },
        { years: ['2021'], months: ['11'], days: ['02'],schedule: [5,8,0],available:[4,1,0] },
        { years: ['2021'], months: ['07'], days: ['15'],schedule: [2,3,0],available:[1,1,0] }
      ],
      value: new Date(),
    }
  },
  methods: {

    handleClose(done){
      done()
    },
    add(){
      var date = this.formData.data.split('-');
      var a =  {
        years: [date[0]],
        months: [date[1]],
        days: [date[2]],
        schedule: [this.formData.num1,this.formData.num2,0],
        available: new Array(3).fill(0),
      };

      axios.get(this.$global_msg.url+"/setSchedule/"+this.doctorId+"/"+new Date(this.formData.data).getTime()+"/"+
        this.formData.num1+"/"+this.formData.num2).then( (response)=>{
        console.log(response);
        if(response.data == 1) {
          var exit = false;
          for(var i=0;i<this.calendarData.length;i++){
            var item = this.calendarData[i];
            if(item.years == a.years && item.months == a.months && item.days == a.days){
              item = a;
              exit = true;
            }
          }
          if(!exit) this.calendarData.push(a);
          alert("发布成功！");
        }else alert("发布失败！");
      },function (err){
        console.log(err);
      })
    },

    getSchedule(){
      console.log('enter getSchedule method');
       axios.get(this.$global_msg.url+"/getSchedules/"+this.doctorId+"/"+this.value.getTime()).then( (response)=>{
         console.log(response);
         this.calendarData = response.data;
       },function (err){
         console.log(err);
       })
    }
  },
  mounted:function(){
    console.log('mounted');
    this.getSchedule();
  },
}
</script>
<style scoped>
.el-row {
  z-index: 1;
  margin-bottom: 20px;
&:last-child {
   z-index: 1;
   margin-bottom: 0;
 }
}

.calendar-day{
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}
.active{
  /*background-color: #999999;*/
}
.mark{
  /*padding: 8px 8px 0 8px;*/
  color: #F8A535;
  z-index: -1;
  font-size: smaller;

}
#calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after{
  content: '当月';
}
.el-backtop, .el-calendar-table td.is-today{
  color: #F8A535!important;
}
.calItem{
  /* font-size: 20px */
  overflow: hidden;
}
.dayItem{}
/* .el-calendar-table .el-calendar-day{
    position: relative!important;
} */
.addBtn{
  /*position: absolute;*/
  z-index: 99;
  /*display: block;*/
  /*width: 65px;*/
  /*height: 20px;*/
  /*padding: 9px;*/
  background: rgba(0, 200, 156, .6);
  color: #fff;
  /*top: 0;*/
  /*bottom: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*margin: auto;*/
  border-radius: 5px
}
.addBtn:hover{
  background: rgba(0, 200, 156, 1);
}
</style>
<style>
.dayItem{
  font-size: 35px;
  /*position: absolute;*/
  /*width: 100%;*/
  /*height: 85px;*/
  text-align: center;
  /*line-height: 85px;*/
  /*margin: 0;*/
  z-index: 1;
}
.current .dayItem{
  color: #3A7;
  opacity: 0.5;
}
.el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev {
  color: #C0C4CC;
  background: #fafafa;
}

</style>

