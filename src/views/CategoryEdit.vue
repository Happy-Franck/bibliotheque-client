<template>
    <div class="categoryedit">
        <div v-if="msg != '' && alert == true">
            {{msg}}
            <span @click="closeAlert()">x</span>
        </div>
        <form @submit.prevent="editer">
            <input type="text" v-model="category.type"/>
            <button :disabled="category.type== ''">Modifier</button>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent , reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import Category from '@/types/Category'
import http from '@/axios'

export default defineComponent({
    setup() {
        const router = useRoute()
        const state = reactive({
            category: {} as Category,
            msg: '',
            alert: false
        })
        http.get("/categorie/get/"+router.params.id ,{ 
                headers : {
                    "x-access-token" : localStorage.getItem('token')
                }
            }).then(
            (response) => {
                if (response){
                    state.category = response.data
                    state.alert = true
                }
            }
        )
        function editer(){
            http.put("/categorie/update/"+router.params.id ,
                {
                    type: state.category.type
                },
                { 
                    headers : {
                        "x-access-token" : localStorage.getItem('token')
                    }
                }).then(
                (response) => {
                    if (response){
                        state.msg = response.data.message
                    }
                }
            )
        }
        function closeAlert(){
            state.alert = false
            state.msg = ''
        }
        return { ...toRefs(state) , editer , closeAlert }
    },
})
</script>
