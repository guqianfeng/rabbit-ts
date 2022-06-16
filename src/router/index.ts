import { createRouter, createWebHashHistory } from "vue-router";

import Layout from "@/views/layout/index.vue";
import Home from "@/views/home/index.vue";
import useStore from "@/store";

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => {
    return {
      top: 0,
    };
  },
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Home,
        },
        {
          path: "/category/:id",
          component: () => import("@/views/category/index.vue"),
        },
        {
          path: "/category/sub/:id",
          component: () => import("@/views/category/sub.vue"),
        },
        {
          path: "/goods/:id",
          component: () => import("@/views/goods/index.vue"),
        },
        {
          path: "/cart",
          component: () => import("@/views/cart/index.vue")
        },
        {
          path: '/member/checkout',
          component: () => import('@/views/member/pay/checkout.vue')
        },
        {
          path: '/member/pay',
          component: () => import('@/views/member/pay/index.vue')
        }
      ],
    },
    { path: "/login", component: () => import("@/views/login/index.vue") },
    {
      path: "/playground",
      component: () => import("@/views/playground/index.vue"),
    },
    { path: "/login/callback", component: () => import("@/views/login/callback.vue") },
  ],
});

router.beforeEach((to, from, next) => {
  const {cart} = useStore()
  if (cart.isLogin) {
    next()
  } else {
    if (to.path.includes('/member')) {
      next({
        path: '/login',
        query: {
          redirectUrl: to.fullPath
        }
      })
    } else {
      next()
    }
  }
})

export default router;
