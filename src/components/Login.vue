<script>
import axios from "axios";

export default {
    name: 'Login',
    methods: {
        login(){
            const mail = document.getElementById('mail')
            const password = document.getElementById('password')
            axios
                .post('url', {
                    mail: mail,
                    password: password
                })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}
</script>

<template>
    <div>
        <h1>Se connecter</h1>
        <div class="login-form">
            <input type="text" placeholder="Entrez votre mail" id="mail">
            <input type="text" placeholder="Entrez votre mot de passe" id="password">
            <button @click="login">Envoyer</button>
        </div>
    </div>
</template>

<style scoped>
.login-form{
    display: flex;
    flex-direction: column;
    width: 25%;
    gap: 10px;
}
</style>