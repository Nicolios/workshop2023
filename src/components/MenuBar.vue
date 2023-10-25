<script>
export default {
    name: 'MenuBar'
}
</script>

<template>
    <nav>
        <router-link to="/admin">Admin</router-link>
        <router-link to="/maps">Map</router-link>
<!--        <router-link to="/menu">Menu</router-link>-->
        <router-link to="/login">Connexion</router-link>
    </nav>
</template>


<style>
nav {
    display: flex;
    gap: 25px;
    margin-bottom: 10px;
}
</style>