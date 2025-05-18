import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/pages/auth/Login.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/index.vue'),
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token')
    if (to.meta?.requiresAuth && !token) {
        next({ name: 'Login' })
    } else if (to.name === 'Login' && token) {
        next({ name: 'Home' })
    } else {
        next()
    }
})

export default router
