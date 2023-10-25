import { createRouter, createWebHistory } from 'vue-router'
import GoogleMaps from "@/components/GoogleMaps.vue";
import Admin from "@/components/Admin.vue";
import Login from "@/components/Login.vue";
import Client from "@/components/Client.vue";

const routes = [
    {
        path: '/maps',
        name: 'googleMaps',
        component: GoogleMaps
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/menu',
        name: 'menu',
        component: Client
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
