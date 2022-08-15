<template>
    <div class="profil">
        <div class="current">
            <p>pseudo user : {{user.pseudo}}</p>
            <p>email : {{user.email}}</p>
            <p>role : {{user.role}}</p>
            <p>tel : {{user.tel}}</p>
            <p>addr : {{user.adresse}}</p>
            <div v-if="msg != '' && alert == true" class="alert">
                {{msg}}
                <span @click="closeAlert()">x</span>
            </div>
        </div>
        <form @submit.prevent="editer">
            <input type="text" placeholder="pseudo" v-model="userSet.pseudo"/><br/>
            <input type="text" placeholder="email" v-model="userSet.email" disabled/><br/>
            <input type="number" v-model="userSet.tel"/><br/>
            <input type="text" placeholder="adresse" v-model="userSet.adresse"/><br/>
            <input type="text" placeholder="password" v-model="password"/><br/>
            <button>Valider</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Personne from '@/types/Personne'
import http from '@/axios'

export default defineComponent({
    name: 'ProfilView',
    data(){
        return{
            msg: '',
            alert: false,
            userSet: {} as Personne,
            password: ''
        }
    },
    mounted(){
        (async () => {
            try{
                const result = await http.get('/perso/get/'+this.$store.getters.getUser._id , 
                    { headers : {
                        "x-access-token" : localStorage.getItem('token')
                    }}).then(
                    (response) => {
                        this.userSet = response.data
                    }
                )
                console.log(result)
            }
            catch(error) {
                console.log(error)
            }
        })();
    },
    computed: {
        user: function(){
            return this.$store.getters.getUser
        }
    },
    methods: {
        editer(){
            http.put('/perso/update/'+this.$store.getters.getUser._id ,
                {
                    pseudo : this.userSet.pseudo,
                    email : this.userSet.email,
                    tel : this.userSet.tel,
                    adresse : this.userSet.adresse,
                    password : this.password,
                    photo : 'new photo',
                    role : this.user.role
                },
                { headers : {
                    "x-access-token" : localStorage.getItem('token')
                }}
            ).then(
                (response) => {
                    this.$store.dispatch('setUser', {
                        _id: this.$store.getters.getUser._id,
                        pseudo : this.userSet.pseudo,
                        email : this.userSet.email,
                        tel : this.userSet.tel,
                        adresse : this.userSet.adresse,
                        password : this.password,
                        photo : 'new photo',
                        role : this.user.role
                    })
                    if(response.data.message){
                        this.msg = response.data.message 
                        this.alert = true
                    }
                }
            ).catch(
                (err) => {
                    if (err){
                        console.log(err)
                    }
                }
            )
        },
        closeAlert(){
            this.alert = false
            this.msg = ''
        }
    }
})
</script>
<style scoped>
    
</style>>