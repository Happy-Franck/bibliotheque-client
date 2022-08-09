<template>
    <div class="membresedit">
        {{user}}
        <p>Nom: {{user.pseudo}}</p>
        <p>Email: {{user.email}}</p>
        <p>Adresse: {{user.adresse}}</p>
        <p>Tel: {{user.tel}}</p>
        <p>Photo: {{user.photo}}</p>
        <form @submit.prevent="editer">
            <select v-model="user.role">
                <option v-for="i in roles" :key="i._id" :value="i._id">
                    {{i.name}}
                </option>
            </select>
            <button>Editer</button>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent , reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import Personne from '@/types/Personne'
import http from '@/axios'

export default defineComponent({
    setup() {
        const router = useRoute()
        const state = reactive({
            user: {} as Personne,
            roles: []
        })
        http.get("/role/get").then(
            (response) => {
                if (response){
                    state.roles = response.data
                }
            }
        )
        http.get("/perso/get/"+router.params.id ,{ 
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            }).then(
            (response) => {
                if (response){
                    state.user = response.data
                }
            }
        )
        function editer(){
            http.put("/perso/update/"+router.params.id ,
                {
                    role : this.role,
                }, 
                { 
                    headers : {
                        "x-access-token" : localStorage.getItem('token')
                    }
                }).then(
                (response) => {
                    if (response.data.message){
                        this.$router.push('/admin/membres')
                    }
                }
            )
        }
        return { ...toRefs(state) , router , editer }
    },
})
</script>
