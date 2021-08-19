<template>
  <div>
    <el-col :span="2">
      <el-menu
        :default-active="this.$route.path"
        mode="horizontal"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
<!--        background-color="#545c64"-->
<!--        text-color="#fff"-->
<!--        active-text-color="#ffd04b">-->

        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.partCode" :disabled="item.partCode.length<=4">
          <template slot="title">
<!--            <i class="el-icon-s-platform"></i>-->
            <span v-if="item.partCode.length<=4" style="color: black;font-size: larger;font-weight: bolder">  {{ item.name }}</span>
            <span v-else > {{ item.name }} </span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>

    <router-view class="menu-right" />
  </div>
</template>
<script>
export default {
  name: 'DoctorInfo',
  data() {
    return {
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
    },
  },
};
</script>

<style>
.menu-right {
  margin-left: 200px;
}
</style>
