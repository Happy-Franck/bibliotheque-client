<template>
    <div class="membres">
        <div class="box">
			<div class="header">
				<h3>Liste des membres</h3>
                <input v-model="searchTerm" type="text" placeholder="Entrez un nom"/>
			</div>
			<div class="content">
                <div class="user-item" v-for="user in filterByName" :key="user.id">
					<div class="img-container">
						<img src="@/assets/img/a.jpg"/>
					</div>
					<div class="info-content">
						<h4 class="titre" :class="[
                            { violet: user.role == '62dd7269a9a8e2718ec3ddad'},
                            { rose: user.role == '62dd728ba9a8e2718ec3ddb0'},
                            { bleu: user.role == '62dd72a1a9a8e2718ec3ddb2'}]"
                        >{{ user.pseudo }}</h4>
						<p>{{ user.email }}</p>
                        <router-link :to="{name: 'membresEdit', params: {id: user._id}}">
                            voir
                        </router-link>
					</div>
				</div>
			</div>
			<div class="footer"></div>
		</div>
    </div>
</template>
<script lang="ts">
import { defineComponent , computed , reactive , toRefs } from 'vue'
import http from '@/axios'
import Personne from '@/types/Personne'

export default defineComponent({
    name: 'MembresView',
    setup(){
        const state = reactive({
            personnes : [] as Personne[],
            searchTerm: '',
            //roles : '' as any
        })
        const getPersonnes = () => {
            http.get("/perso/get" , { headers : {
                "x-access-token" : localStorage.getItem('token')
            }}).then(
                (response) => {
                    if (response){
                        state.personnes = response.data
                    }
                }
            )
        }
        getPersonnes();
        /*http.get("/role/get").then(
            (response) => {
                if (response){
                    state.roles = response.data
                        for(let i of state.roles){
                            console.log(i.name)
                        }
                }
            }
        )*/
        
        const filterByName = computed(function () {
            return state.personnes.filter(user => {
                return user.pseudo.toLowerCase().includes(state.searchTerm.toLowerCase());
            });
        })

        return { 
            ...toRefs(state),
            filterByName,
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
    .box .header{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .box .header input{
        height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        outline: none;
        border: 1px solid rgba(128, 128, 128, 0.5);
        border-radius: 3px;
        background: white;
    }
    @media (max-width: 768px){
        .box .header input{
            width: 100%;
        }
    }
    .box .header h3{
        margin: 0;
        padding-bottom: 40px; 
        font-size: 24px;
    }
    .box .content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .box .content .user-item{
        margin-left: 1%;
        width: 44%;
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
        border-left: 5px solid transparent;
        box-shadow: 0px 0px 10px rgba(202, 202, 202, 0.671);
        padding: 15px;
        border-radius: 5px;
    }
    @media (max-width: 992px) {
        .box .content .user-item{
            width: 100%;
            margin-left: 0px;
            box-shadow: 0px 0px 10px transparent;
        }
    }
    .box .content .user-item .img-container{
        width: 67px;
        height: 67px;
        border: 1px solid rgba(128, 128, 128, 0.25);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .box .content .user-item .img-container img{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }
    .box .content .user-item .info-content{
        margin-left: 15px;
        line-height: 34px;
    }
    .box .content .user-item .info-content h4.titre{
        margin: 0;
        margin-left: 18px;
        position: relative;
    }
    .box .content .user-item .info-content h4.titre::before{
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        z-index: 10;
        top: 12px;
        left: -18px;
    }
    .box .content .user-item .info-content h4.titre.violet::before{
        background-color: #6c63e2;
    }
    .box .content .user-item .info-content h4.titre.rose::before{
        background-color: #ff76a7;
    }
    .box .content .user-item .info-content h4.titre.bleu::before{
        background-color: #92a9ff;
    }
    .box .content .user-item .info-content p{
        margin: 0;
        opacity: 0.5;
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