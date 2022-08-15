<template>
    <div class="navbaradmin">
        <div class="sidebar" :class="[{nepasafficher : afficher == false}]">
            <router-link to="/admin/profil">
                <div class="photo" :class="[{nepasafficher : afficher == false}]">
                    <img src="@/assets/img/user.jpeg"/>
                    <span>{{user.pseudo}}</span>
                </div>
            </router-link>
            <ul>
                <router-link to="/admin/membres">
                    <li>
                        <span>0</span>
                        <p>Membres</p>
                    </li>
                </router-link>
                <router-link to="/admin/categories">
                    <li>
                        <span>0</span>
                        <p>Catégories</p>
                    </li>
                </router-link>
                <router-link to="/admin/livres">
                    <li>
                        <span>0</span>
                        <p>Livres</p>
                    </li>
                </router-link>
                <li class="deconnexion" @click="deconnexion">
                    <span>0</span>
                    <p>Deconnexion</p>
                </li>
            </ul>
        </div>
        <div class="container" :class="[{nepasafficher : afficher == false}]">
            <div class="navbar">
                <div class="drawer" @click="toggleSidebar"></div>
                <div class="searchform">
                    <form @submit.prevent="chercher">
                        <input class="search" v-model="searchTerm" type="text" placeholder="Chercher ..."/>
                    </form>
                </div>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavbarAdmin',
    data(){
        return{
            searchTerm: '' as string,
            afficher: true
        }
    },
    computed: {
        /*setup(){
            const user = computed(function(){
                return this.$store.getters.getUser
            })
        }*/
        user: function(){
            return this.$store.getters.getUser
        }
    },
    methods: {
        chercher(){
            alert("Vous avez cherché "+this.searchTerm)
        },
        deconnexion(){
            localStorage.clear();
            this.$router.push('/login');
            this.$store.commit('setUserMutation', {})
        },
        toggleSidebar(){
            this.afficher = !this.afficher
        }
    }
})
</script>
<style scoped>
    .navbaradmin{
        display: flex;
    }
    .navbaradmin .sidebar{
        width: 15%;
        height: 100vh;
        position: sticky;
        top: 0;
        transition: 500ms;
        background-image: linear-gradient(to right, #6a53e0, #937ce9);
    }
    .navbaradmin .sidebar.nepasafficher{
        width: 5%;
        height: 100vh;
        position: sticky;
        top: 0;
        transition: 500ms;
        background-image: linear-gradient(to right, #6a53e0, #937ce9);
    }
    .navbaradmin .sidebar .photo{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 25px;
        margin-top: 50px;
    }
    .navbaradmin .sidebar .photo span{
        color: white;
        margin-top: 15px;
    }
    .navbaradmin .sidebar .photo img{
        border: 2px solid white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }
    .navbaradmin .sidebar .photo.nepasafficher img{
        border: 2px solid white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    .navbaradmin .sidebar .photo.nepasafficher span{
        display: none;
    }
    .navbaradmin .sidebar ul{
        padding: 0;
        margin: 0;
        list-style-type: none;
    }
    .navbaradmin .sidebar ul li{
        padding: 12px;
        color: white;
        padding-left: 25px;
        display: flex;
    }
    .navbaradmin .sidebar ul li p{
        margin: 0;
        padding: 0;
        transition: 500ms;
    }
    .navbaradmin .sidebar ul li span{
        display: none;
        transition: 500ms;
    }
    @media (min-width: 991px) {
        .navbaradmin .sidebar.nepasafficher ul li span{
            transition: 500ms;
            display: block;
        }
        .navbaradmin .sidebar.nepasafficher ul li p{
            display: none;
            transition: 500ms;
        }
        .navbaradmin .sidebar ul li p{
            display: block;
            transition: 500ms;
        }
        .navbaradmin .sidebar ul li span{
            display: none;
        }
    }
    .navbaradmin .sidebar ul li.deconnexion{
        cursor: pointer;
    }
    .navbaradmin .sidebar ul a{
        text-decoration: none;
        color: white;
    }
    .navbaradmin .sidebar ul a.router-link-active li{
        background: white;
        color: black;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    .navbaradmin .container{
        width: 85%;
        transition: 500ms;
    }
    .navbaradmin .container.nepasafficher{
        width: 95%;
        transition: 500ms;
    }

    @media (max-width: 576px){}
    @media (max-width: 992px) {
        .navbaradmin .sidebar .photo span{
            display: none;
        }
        .navbaradmin .sidebar{
            visibility: visible;
            width: 20%;
            transition: 500ms;
        }
        .navbaradmin .sidebar.nepasafficher{
            width: 0%;
            visibility: hidden;
            transition: 0ms;
        }
        .navbaradmin .container.nepasafficher{
            width: 100%;
            transition: 500ms;
        }
        .navbaradmin .container{
            width: 80%;
            transition: 500ms;
        }
    }
    @media (max-width: 768px){
        .navbaradmin .sidebar ul li span{
            transition: 500ms;
            display: block;
        }
        .navbaradmin .sidebar ul li p{
            display: none;
            transition: 500ms;
        }
        .navbaradmin .sidebar.nepasafficher ul li p{
            display: block;
            transition: 500ms;
        }
        .navbaradmin .sidebar.nepasafficher ul li span{
            display: none;
        }
        .navbaradmin .sidebar{
            visibility: visible;
            width: 15%;
            transition: 500ms;
        }
        .navbaradmin .sidebar.nepasafficher{
            width: 0%;
            visibility: hidden;
            transition: 0ms;
        }
        .navbaradmin .container.nepasafficher{
            width: 100%;
            transition: 500ms;
        }
        .navbaradmin .container{
            width: 85%;
            transition: 500ms;
        }
        .navbaradmin .sidebar .photo img{
            border: 2px solid white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    .navbaradmin .container .navbar{
        display: flex;
        margin: 30px;
    }
    .navbaradmin .container .navbar .drawer{
        width: 40px;
        height: 40px;
        border: 1px solid #6b53e098;
        border-radius: 3px;
    }
    .navbaradmin .container form{
        display: flex;
        justify-content: center;
    }
    .navbaradmin .container .searchform{
        width: 100%;
    }
    .navbaradmin .container form .search{
        width: 50%;
        height: 40px;
        border-radius: 20px;
        padding-left: 20px;
        padding-right: 20px;
        outline: none;
        border: none;
        box-shadow: 0px 3px 6px rgba(128, 128, 128, 0.342);
    }
</style>>