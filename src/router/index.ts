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
        redirect: '/nft',
      },
      {
        path: '/nft',
        name: 'nft',
        component: () => import('@/views/NFTList.vue'), // NFT 列表
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
      {
        path: '/manage',
        name: 'manage',
        component: () => import('@/views/Manage.vue'), // 上架/下架管理
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
