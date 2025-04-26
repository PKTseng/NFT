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
        redirect: '/browse',
      },
      {
        path: '/browse',
        name: 'browse',
        component: () => import('@/views/Browse.vue'), // NFT 列表
      },
      {
        path: '/nft/:id',
        name: 'nft-detail',
        component: () => import('@/views/NftDetail.vue'), // NFT 詳情頁
      },
      {
        path: '/my-nfts',
        name: 'my-nfts',
        component: () => import('@/views/MyNfts.vue'),
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
