import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import StudenstList from '../views/student/StudentsList.vue'
import CreateStudent from '../views/student/CreateStudent.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    redirect: '/Welcome',
    children: [
      { path: '/Welcome', component: Welcome },
      { path: '/Students', component: StudenstList },
      { path: '/CreateStudent', component: CreateStudent }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
