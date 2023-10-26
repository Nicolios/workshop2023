<script>
import axios from 'axios';
import router from '../router';
import store from '../store';

import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';

export default {
    name: 'MenuBar',
    mounted() {
        const url = import.meta.env.VITE_API_URL;
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$store.commit('setAuthentication', false);
            this.$toast.info("Déconnexion réussie")
            router.push('/maps')
        },
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isAuthenticated;
        }
    },
    components:{
        VueToast,
    },
}
</script>

<template>
    <ul class="nav nav-underline bg-success">
            <img src="../assets/LogoFoodFinder.png" alt="Logo" width="80" height="60" class="d-inline-block align-text-center">
        <li class="nav-item">
            <router-link class="nav-link link-light" to="/admin">
                    Souscription
            </router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link link-light" to="/maps">Carte interractive</router-link>
        </li>

        <li class="nav-item">
            <router-link class="nav-link link-dark" to="/login" v-if="!isLoggedIn">Connexion</router-link>
            <a class="nav-link link-dark" href="#" @click="logout" v-else>Déconnexion</a>
        </li>
    </ul>

    <vue-toast></vue-toast>
</template>


<style>
    nav {
        margin-bottom: 35px;
        height: auto;
    }
    .nav {
        align-items: center;
    }

    a{
        margin-right: 20px;
    }

    img {
        margin: 20px;
    }
</style>