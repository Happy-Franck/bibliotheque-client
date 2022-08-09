<template>
    <div class="user">
        <button class="deconnexion" @click="deconnexion">
            <span>0</span>
            <p>Deconnexion</p>
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
    }
})
</script>