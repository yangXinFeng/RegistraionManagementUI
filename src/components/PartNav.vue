<template>
<!--  <el-scrollbar style="height: 100%">-->
      <el-menu
        :default-active="this.$route.path"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
<!--        background-color="#545c64"-->
<!--        text-color="#fff"-->
<!--        active-text-color="#ffd04b">-->



        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.partCode" :disabled="item.partCode.length<=headPartLen">
          <template slot="title">
<!--            <i class="el-icon-s-platform"></i>-->
            <span v-if="item.partCode.length<=headPartLen" style="color: black;font-size: larger;font-weight: bolder"> {{ item.name }}</span>
            <span v-else > {{ item.name }} </span>
          </template>
        </el-menu-item>


      </el-menu>

<!--  </el-scrollbar>-->

<!--    <router-view class="menu-right" />-->
</template>
<script>
import axios from "axios";

export default {
  name: 'PartNav',
  // props: ['navList'],
  data() {
    return {
      headPartLen: 4,
      navList: [
        { name: "内科", partCode: "0001" },
        { name: "内分泌科", partCode: "00010001" },
        { name: "血液内科", partCode: "00010002" },
        { name: "神经内科", partCode: "00010003" },
        { name: "外科", partCode: "0002" },
        { name: "骨关节科", partCode: "00020001" },
        { name: "心胸外科", partCode: "00020002" },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index, indexPath) {
      console.log("handleSelect");
      console.log(index);
      this.$emit('get-part-code',index);
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
  },

  mounted:function(){
    console.log('PartNav mounted');
    this.getPart();
  },
};
</script>

<style>
/*.menu-right {*/
/*  margin-left: 200px;*/
/*}*/

.aside_scroll .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
