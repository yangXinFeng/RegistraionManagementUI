import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ForPatient from '@/components/ForPatient'
import DoctorList from '@/components/DoctorList'
import PartNav from '@/components/PartNav'
import Schedule from '@/components/Schedule'

Vue.use(Router)
// mode: 'history',  /*若为history，刷新后页面404，所以要把这行删掉*/
//   base:'/needs-project/',/*base写项目名*/
export default new Router({
  mode: 'history',
  base: '/registration/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/forpatient',
      name: 'ForPatient',
      component: ForPatient
    },
    {
      path: '/doctorlist',
      name: 'DoctorList',
      component: DoctorList
    }
  ]
})
