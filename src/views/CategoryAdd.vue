<template>
    <div class="categoryadd">
        <div v-if="msg != '' && alert == true">
            {{msg}}
            <span @click="closeAlert()">x</span>
        </div>
        <form @submit.prevent="ajouter">
            <input type="text" placeholder="Entrez la catégorie" v-model="category.type"/>
            <button :disabled="category.type==''">Ajouter</button>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent , reactive , toRefs } from 'vue'
import Category from '@/types/Category'
import http from '@/axios'

export default defineComponent({
    setup() {
        const state = reactive({
            category: {} as Category,
            msg: '',
            alert: false,
        })
        function ajouter(){
            http.post('/categorie/create',{
                type: state.category.type
            }, 
            { 
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            }).then(
                (response)=>{
                    state.msg = response.data.message
                    state.alert = true
                    state.category.type = ''
                }
            ).catch(
                (error)=>{
                    console.log(error)
            })
        }   
        function closeAlert(){
            state.alert = false
            state.msg = ''
        }
        return{ ...toRefs(state) , ajouter , closeAlert }
    },
})
</script>
