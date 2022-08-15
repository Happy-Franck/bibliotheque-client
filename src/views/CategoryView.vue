<template>
    <div class="categoryview">
        <router-link to="/admin/categories/ajout">Ajouter</router-link>
        <ul>
            <li v-for="ctg in categories" :key="ctg.id">
                <router-link :to="{name: 'categoriesedit', params: {id: ctg._id}}">
                    {{ctg.type}}
                </router-link>
                <button @click.prevent="supprimer(ctg._id)">x</button>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent , reactive , toRefs } from 'vue'
import Category from '@/types/Category'
import http from '@/axios'

export default defineComponent({
    setup() {
        const state = reactive({
            categories: [] as Category[],
        })
        function getdata(){
            http.get('/categorie/get',
            { 
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            }).then(
                (response)=>{
                    state.categories = response.data
                }
            ).catch(
                (error)=>{
                    console.log(error)
                }
            );
        }
        getdata()
        function supprimer(id: number){
            http.delete('/categorie/delete/'+id ,
            { 
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            }).then(
                (response)=>{
                    console.log(response)
                    getdata()
                }
            ).catch(
                (error)=>{
                    console.log(error)
                }
            );
        }
        return{ ...toRefs(state), supprimer }
    },
})
</script>
