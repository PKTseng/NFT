import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'default',
        redirect: '/owner',
      },
      {
        path: '/owner',
        name: 'owner',
        component: () => import('@/views/Owner.vue'), // NFT 列表
      },
      {
        path: '/creator',
        name: 'creator',
        component: () => import('@/views/Creator.vue'),
      },
      {
        path: '/series',
        name: 'series',
        component: () => import('@/views/Series.vue'),
      },
      {
        path: '/nft/:id',
        name: 'nft-detail',
        component: () => import('@/views/NftDetail.vue'), // NFT 詳情頁
        props: true,
      },
      {
        path: '/mint',
        name: 'mint',
        component: () => import('@/views/Mint.vue'), // NFT 鑄造頁
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
