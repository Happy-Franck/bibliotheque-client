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
    name: 'BookUser',
    components: {
        LivreList
    },
    setup(){
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