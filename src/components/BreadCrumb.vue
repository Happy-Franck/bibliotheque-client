<template>
    <div class="breadcrumb">
        <router-link to="/admin/livres">Livres</router-link>
        <p> / </p>
        <p>{{titre}}</p>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BreadCrumb',
    props: ['titre']
})
</script>
<style scoped>
    .breadcrumb{
        padding: 15px;
        background: white;
        display: flex;
    }
    .breadcrumb a , .breadcrumb p{
        margin: 0;
        padding: 0;
        color: black;
        text-decoration: none;
        margin-right: 10px;
    }
    .breadcrumb a:hover{
        text-decoration: underline;
    }
</style>