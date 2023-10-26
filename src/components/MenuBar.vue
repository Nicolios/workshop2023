<script>
import axios from 'axios';
import {isAuthenticated} from '../router';

export default {
    name: 'MenuBar',
    mounted() {
        const url = import.meta.env.VITE_API_URL;
        console.log(this.isAuthent())
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
            return isAuthenticated();
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-secondary">
        <div class="container-fluid">
            <div>
                <a class="navbar-brand" href="/admin">
                    <img src="../assets/LogoFoodFinder.png" alt="Logo" width="80" height="60" class="d-inline-block align-text-center">Souscription</a>
                <a class="navbar-brand" href="/maps">Carte interractive</a>
            </div>
            <div>
                <a class="navbar-brand" href="/login" v-if="!isAuthent()">Connexion</a>
                <a class="navbar-brand" href="#" @click="logout" v-else>Déconnexion</a>
            </div>
        </div>
    </nav>
</template>


<style>
    nav {
        margin-bottom: 35px;
        height: auto;
    }

    a{
        margin-right: 20px;
    }

    img {
        margin-right: 20px;
    }
</style>