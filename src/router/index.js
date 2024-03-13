import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/login.vue'
import Register from '../views/register.vue'
import AdminPanel from '../components/AdminPanel.vue'

const routes = [
    {
        path: '/',
        name: 'home',
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/panel",
        name: "Panel Page",
        component: AdminPanel
    }
]

let router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
