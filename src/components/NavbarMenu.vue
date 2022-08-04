<template>
    <div>
        <div class="navbarMenu">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavbarMenu',
})
</script>
<style scoped>
.navbarMenu{
    width: 100%;
    background: white;
    position: fixed;
    z-index: 99;
    top: 0;
    padding: 25px;
}
.navbarMenu a{
    text-decoration: none;
    padding: 15px;
    color: rgba(0, 0, 0, 0.6);
    border-radius: 3px;
}
.navbarMenu a.router-link-active{
    text-decoration: none;
    color: black;
    background: #e9ecf1;
}
</style>