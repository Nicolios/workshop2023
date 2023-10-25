<script>
import axios from 'axios';
import router from '../router';

export default {
    name: 'MenuBar',
    mounted() {
        const url = import.meta.env.VITE_API_URL;
    },
    methods: {
        logout() {
            axios.post(url+'users/logout').then((response) => {
                localStorage.clear();
            }).catch((error) => {
                console.error(error);
            })
        },

        isAuthent() {
            return router.isAuthenticated();
        }
    },
    components: {
        router
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-secondary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/admin">Souscription</a>
            <a class="navbar-brand" href="/maps">Carte interractive</a>
            <a class="navbar-brand" href="/login" v-if="isAuthent">Connexion</a>
            <a class="navbar-brand" @click="logout" v-else>Déconnexion</a>
        </div>
    </nav>
</template>


<style>
    nav {
        margin-bottom: 35px;
    }
</style>