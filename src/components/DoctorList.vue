<template>
  <div>
  <el-row v-for="(page, index) of pages" :key="index" :gutter="20">
    <el-col :span="4" v-for="(item, innerindex) of page" :key="item.id" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <div class="block">
          <el-image :src="require('@/assets/'+item.image)" fit="cover" style="height: 200px"/>
          </div>
          <div style="padding: 14px;">
            <span>{{ item.name }}</span>
          </div>
          <div class="bottom clearfix" style="font-size: smaller;color: dimgray">
            <el-row v-for="(o,idx) in 2" :key="o" >
              <span v-if="idx===0">上午余号：</span>
              <span v-else>下午余号：</span>
              <span>{{item.availableRegister[idx]}}</span>
              <el-button type="text" class="button" @click="register(item.id,idx)">挂号</el-button>
            </el-row>
<!--              <el-row>-->
<!--                <span>上午号数：{{item.availableRegister[0]}}}</span>-->
<!--                <el-button type="text" class="button" @click="register(item.id,0)">挂号</el-button>-->
<!--              </el-row>-->
<!--              <el-row>-->
<!--                <span>下午号数：{{item.availableRegister[1]}}}</span>-->
<!--                <el-button type="text" class="button" @click="register(item.id,1)">挂号</el-button>-->
<!--              </el-row>-->

            </div>

        </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "DoctorList",
  data() {
    return {
      currentDate: new Date(),
      doctors:[{
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

    };
  },
  methods:{
    register(doctorId,workTime){
      console.log("register");
      console.log(doctorId,workTime);
      var res = false;
      const h = this.$createElement;
      this.$msgbox({
        // title: '消息',
        message: h('p', null, [
          h('span', null, '确认挂号？ '),
          // h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              res = true;
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action + res?"成功":"失败"
        });
      });
    },
  },
  computed:{
    pages () {
      const pages = []
      this.doctors.forEach((item, index) => {
        const page = Math.floor(index / 4)//4代表4条为一行，随意更改
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
   margin-bottom: 0;
 }
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
