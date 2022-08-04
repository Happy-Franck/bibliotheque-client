<template>
    <div class="livreitem mt-5">
        <BreadCrumb :titre="livre.titre"/>
        <div class="livre">
            <div class="couverture">
                <img src="@/assets/img/bex.jpg" class="img"/>
            </div>
            <div class="info">
                <div>
                    <h2>{{livre.titre}}</h2>
                    <p><b>Prix fixé : </b>{{livre.prix}} Ariary</p>
                    <p><b>Prix en promotion : </b>{{livre.prix_promo}} Ariary</p>
                    <p v-if="livre.status == 1"><b>Status : </b>En promotion</p>
                    <p v-else-if="livre.status == 2"><b>Status : </b>Vente normal</p>
                    <p v-else-if="livre.status == 3"><b>Status : </b>Epuisement de stock</p>
                    <p><b>Stock : </b>{{livre.stock}}</p>
                </div>
                <div class="footer"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent , reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import Livre from '@/types/Livre'
import http from '@/axios'
import BreadCrumb from '@/components/BreadCrumb.vue'

export default defineComponent({
    name: 'LivreItem',
    components: {
        BreadCrumb
    },
    setup(){
        const router = useRoute()
        const state = reactive({
            livre: [] as Livre[]
        })
        const getLivre = () => {
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
        }
        getLivre();
        return { router , ...toRefs(state) }
    }
})
</script>
<style scoped>
    .livreitem{
        margin: 30px;
    }
    .livreitem .livre{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 30px;
    }
    .livreitem .livre .couverture{
        width: 50%;
    }
    .livreitem .livre .couverture img{
        width: 100%;
        height: 500px;
        object-fit: cover;
    }
    .livreitem .livre .info{
        width: 40%;
        padding: 25px;
        padding-bottom: 0px;
        background: #ffffff;
        height: auto;
        max-height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .livreitem .livre .info h2{
        text-align: center;
        margin-bottom: 25px;
    }
    @media (max-width: 768px){
        .livreitem .livre .couverture{
            width: 100%;
        }
        .livreitem .livre .info{
            width: 100%;
            margin-top: 25px;
        }
    }
    .livre .info .footer{
        margin-top: 25px;
        width: 60%;
        height: 8px;
        background-image: linear-gradient(to right, #6a53e0, #937ce9);
        align-self: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
</style>
    