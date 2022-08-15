<template>
    <div class="user">
        <button class="deconnexion" @click="deconnexion">
            <span>0</span>
            <p>Deconnexion</p>
        </button>
        <button class="deconnexion" @click="panier">
            <span>0</span>
            <p>Panier</p>
        </button>
        <router-view/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavbarUser',
    methods: {
        deconnexion(){
            localStorage.clear();
            this.$router.push('/login');
            this.$store.commit('setUserMutation', {})
        },
        panier(){
            this.$router.push('/user/panier');
        }
    }
})
</script>