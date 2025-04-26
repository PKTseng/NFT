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
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/nft-list',
        name: 'nft-list',
        component: () => import('@/views/NftList.vue'),
      },
      {
        path: '/nft/:id',
        name: 'nft-detail',
        component: () => import('@/views/NftDetail.vue'),
      },
      {
        path: '/my-nfts',
        name: 'my-nfts',
        component: () => import('@/views/MyNfts.vue'),
      },
      {
        path: '/mint',
        name: 'mint',
        component: () => import('@/views/Mint.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
