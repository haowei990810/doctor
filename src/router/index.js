import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '蜱护', tab: true }
  },
  {
    path: '/check',
    name: 'check',
    component: () => import('@/views/CheckView.vue'),
    meta: { title: '症状自查', tab: true }
  },
  {
    path: '/handle',
    name: 'handle',
    component: () => import('@/views/HandleView.vue'),
    meta: { title: '正确处理', tab: true }
  },
  {
    path: '/disease',
    name: 'disease',
    component: () => import('@/views/DiseaseView.vue'),
    meta: { title: '疾病百科', tab: true }
  },
  {
    path: '/disease/:id',
    name: 'diseaseDetail',
    component: () => import('@/views/DiseaseDetail.vue'),
    meta: { title: '疾病详情' }
  },
  {
    path: '/prevent',
    name: 'prevent',
    component: () => import('@/views/PreventView.vue'),
    meta: { title: '预防指南', tab: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `蜱护 · ${to.meta.title}` : '蜱护'
})

export default router
