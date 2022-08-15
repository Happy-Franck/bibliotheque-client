<template>
    <div class="livreedit">
        <div class="box">
            <form @submit.prevent="update">
                <div class="form-group">
                    <label for="titre">Titre :</label>
                    <input id="titre" type="text" v-model="livre.titre"/>
                </div>
                <div class="form-group">
                    <label for="prix">Prix :</label>
                    <input id="prix" type="number" v-model="livre.prix"/>
                </div>
                <div class="form-group">
                    <label for="prix_promo">Prix en promotion :</label>
                    <input id="prix_promo" type="number" v-model="livre.prix_promo"/>
                </div>
                <div class="form-group">
                    <label for="status">Status</label>
                    <select v-model="livre.status">
                        <option value="1">Promotion</option>
                        <option value="2">Vente normal</option>
                        <option value="3">Stock épuisé</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="stock">Nombre en stock :</label>
                    <input id="stock" type="number" v-model="livre.stock"/>
                </div>
                <div class="form-group">
                    <label for="categorie">Catégorie:</label>
                    <select id="categorie" v-model="livre.categorie">
                        <option v-for="i in categories" :key="i._id" :value="i._id">{{i.type}}</option>
                    </select>
                </div>
                <button>Modifier</button>
            </form>
            <div class="img-fond">
                <img src="@/assets/img/fond.jpg"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent , reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import Livre from '@/types/Livre'
import Category from '@/types/Category'
import http from '@/axios'

export default defineComponent({
    setup() {
        const router = useRoute()
        const state = reactive({
            livre: [] as Livre[],
            categories: [] as Category[],
        })
        http.get("/livre/get/"+router.params.id ,{ 
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            }).then(
            (response) => {
                if (response){
                    state.livre = response.data
                }
            }
        )
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
        function update(){
            http.put("/livre/update/"+router.params.id ,
                {
                    titre: this.livre.titre,
                    prix: this.livre.prix,
                    prix_promo: this.livre.prix_promo,
                    status: parseInt(this.livre.status),
                    stock: this.livre.stock,
                    categorie: this.livre.categorie,
                }, 
                { 
                    headers : {
                        "x-access-token" : localStorage.getItem('token')
                    }
                }).then(
                (response) => {
                    if (response.data.message){
                        this.$router.push({path :'/admin/livres' , })
                    }
                }
            )
        }
        return { router , ...toRefs(state) , update }
    }
})
</script>
<style scoped>
    .livreedit{
        margin: 30px;
    }
    .livreedit .box{
        display: flex;
    }
    .livreedit .box .img-fond{
        width: 50%;
        height: 500px;
    }
    .livreedit .box .img-fond img{
        width: 100%;
        height: 500px;
        object-fit: cover;
    }
    .livreedit form{
        width: 50%;
        background: white;
        padding: 45px;
        display: flex;
        flex-direction: column;
    }
    .livreedit form .form-group{
        display: flex;
        flex-direction: column;
    }
    .livreedit form .form-group label{
        margin-top: 15px;
        margin-bottom: 4px;
    }
    .livreedit form .form-group input , .livreedit form .form-group select{
        height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        outline: none;
        border: 1px solid rgba(128, 128, 128, 0.5);
        border-radius: 3px;
        background: white;
    }
    .livreedit form button{
        border: none;
        color: white;
        padding: 10px;
        outline: none;
        margin-top: 15px;
        margin-bottom: 4px;
        background-image: linear-gradient(to right, #6a53e0, #937ce9);
    }
    @media (max-width: 768px){
        .livreedit .box form{
            width: 100%;
            padding-bottom: 45px;
        }
        .livreedit .box .img-fond{
            display: none;
        }
    }
</style>
