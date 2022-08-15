<template>
    <div class="panier">
        <h1>Panier</h1>
        <div class='list-commande' v-for="livre in panier" :key="livre.id">
            <div>
                <div class="card-image">
                    <img src="@/assets/img/bex.jpg" width="100" height="100"/>
                </div>
                <div class="card-body">
                    <p>{{livre.titre}}</p>
                    <p>{{livre.prix}}</p>
                    <button @click="annuler(livre)">Annuler</button>
                </div>
            </div>
        </div>
        <button @click="envoyer()">Envoyer les commandes</button>
    </div>
</template>
<script lang="ts">

import {defineComponent , reactive, toRefs} from "vue"
import { userRoute } from 'vue-router'
import http from '@/axios'
import Livre from '@/types/Livre'

export default defineComponent({
    name: "PanierView",
    data(){
        return{
            panier: []
        }
    },
    setup(){
        const state = reactive({
            panier: [],
        })
        state.panier = JSON.parse(localStorage.getItem('commande'))
        return {...toRefs(state)}
    },
    methods:{
        annuler(livre){
            const modification = this.panier.filter(data=>data.numero!=livre.numero); 
            localStorage.setItem('commande', JSON.stringify(modification))
            this.panier = modification
        },
        envoyer(){
            let commandes = [];
            if(this.panier.length > 0){
                this.panier.map(data=>{
                commandes.push({
                        livre: data._id,
                        personne: this.$store.getters.getUser._id
                    })
                })
                console.log(commandes)
                http.post("panier/create",{commandes: commandes},{ 
                    headers : {
                        "x-access-token" : localStorage.getItem('token')
                    }
                }).then(
                (response) => {
                    if (response){
                        console.log(response);
                    }
                })
                localStorage.removeItem('commande');
                this.$router.push('/user/livres');
            }
        }
    }
})

</script>