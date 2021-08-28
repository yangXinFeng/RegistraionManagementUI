import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ForPatient from '@/components/ForPatient'
import DoctorList from '@/components/DoctorList'
import Login from '@/components/Login'
import ForDoctor from '@/components/forDoctor'

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
      path: '/fordoctor/:id',
      props:true,
      name: 'ForDoctor',
      component: ForDoctor
    },
    {
      path: '/forpatient/:id',
      props:true,
      name: 'ForPatient',
      component: ForPatient
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
