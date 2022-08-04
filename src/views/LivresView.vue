<template>
    <div class="livres">
        <div class="box">
            <div class="header">
                <h3>Liste des Livres</h3>
            </div>
            <div class="content">
                <LivreList :livres="livres"/>
            </div>
            <div class="footer"></div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent , reactive , toRefs } from 'vue'
import LivreList from '@/components/LivreList.vue'
import Livre from '@/types/Livre'
import http from '@/axios';

export default defineComponent({
    name: 'LivreView',
    components: {
        LivreList
    },
    setup(){
        //const livres = ref<Livre[]>([])
        const state = reactive({
            livres : [] as Livre[],
        })
        const getLivres = () => {
            http.get("/livre/get" , { headers : {
                "x-access-token" : localStorage.getItem('token')
            }}).then(
                (response) => {
                    if (response){
                        state.livres = response.data
                    }
                }
            )
        }

        getLivres();
        return { 
            ...toRefs(state) 
        }
    }
})
</script>

<style scoped>
    .box{
        background-color: white;
        margin: 30px;
        padding: 50px 50px 0px 50px;
        display: flex;
        flex-direction: column;
    }
    .box .title h3{
        margin: 0;
        padding-bottom: 40px; 
        font-size: 24px;
    }
    .box .content{
        display: flex;
        flex-wrap: wrap;
    }
    
    .box .footer{
        margin-top: 25px;
        width: 60%;
        height: 8px;
        background-image: linear-gradient(to right, #6a53e0, #937ce9);
        align-self: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
</style>