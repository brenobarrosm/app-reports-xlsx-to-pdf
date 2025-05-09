
import {createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/index.vue')
        },
        {
            path: '/relatorio',
            name: 'VisualizarRelatorio',
            component: () => import('@/views/pages/visualizacao/VisualizarRelatorio.vue')
        }
    ]
})
export default router

