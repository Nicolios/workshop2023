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
        component: Admin,
        meta: {requiresAuth: true}
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

router.beforeEach((to, from, next) => {
    if(to.matched.some(route => route.meta.requiresAuth)) {
        if(isAuthenticated()) {
            next();
        }else{
            next("/login");
        }
    }else{
        next();
    }
})

function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

export {router as default   , isAuthenticated};
