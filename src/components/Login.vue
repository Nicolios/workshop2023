<script>
import axios from "axios";

import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';
import router from "../router";

export default {
    name: 'Login',

    methods: {
        login(){
            const mail = document.getElementById('mail').value;
            const password = document.getElementById('password').value;
            axios
                .post(import.meta.env.VITE_API_URL+'users/authenticate', {
                    email: mail,
                    password: password,
                })  
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    this.$store.commit('setAuthentication', true);
                    router.push('/maps')
                    this.$toast.info("Connexion réussie")
                })
                .catch((error) => {
                    console.error(error);
                    this.$toast.error("Identifiant ou mot de passe incorrect");
                })
        }
    },
    components:{
        VueToast,
    },
}
</script>

<template>
    <div class="body">
        <h1>Se connecter</h1>
        
        <div class="form">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Adresse Email</label>
                <input type="email" class="form-control" id="mail" placeholder="name@example.com">
            </div>

            <div class="mb-3">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="*****">
            </div>

            <button type="button" class="btn btn-primary bg-success" id="valid" @click="login">Connexion</button>
            <vue-toast></vue-toast>

        </div>
    </div>
</template>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .form {
        display: flex;
        max-width: 500px;
        width: 100%;
    }

    
</style>