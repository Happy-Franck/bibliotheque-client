<template>
    <div class="livrelist">
        <div class="card-item" v-for="livre in livres" :key="livre.id">
            <router-link :to="{name: 'livreItem', params: {id: livre._id}}">
                <div class="card">
                    <div class="card-image">
                        <img src="@/assets/img/bex.jpg"/>
                    </div>
                    <div class="card-body">
                        <div class="info">
                            <h4>{{livre.titre}}</h4>
                            <span>{{livre.prix}} Ar</span>
                        </div>
                    </div>
                    <div class="border-container">
                        <div class="border"></div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent , PropType } from 'vue'
import Livre from '@/types/Livre'

export default defineComponent({
    name: 'LivreList',
    props: {
        livres: {
            required: true,
            type: Array as PropType<Livre[]>
        }
    },
})
</script>
<style scoped>
.livrelist{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.livrelist .card-item{
    width: 23%;
    margin: 0 1%;
    margin-bottom: 25px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(202, 202, 202, 0.671);
}
@media (max-width: 1200px) {
    .livrelist .card-item{
        width: 31%;
    }
}
@media (max-width: 992px) {
    .livrelist .card-item{
        width: 48%;
    }
}
/*@media (max-width: 768px){}*/
@media (max-width: 576px){
    .livrelist .card-item{
        width: 100%;
    }
}
.livrelist .card-item a{
    text-decoration: none;
    color: black;
}
.livrelist .card-item .card{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.livrelist .card-item .card .card-image{
    width: 100%;
    height: 300px;
    overflow: hidden;
}
.livrelist .card-item .card .card-image img{
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: 500ms;
}
.livrelist .card-item .card:hover .card-image img{
    transform: scale(1.2) rotateZ(2deg);
}
.livrelist .card-item .card .card-body{
    height: 50px;
    padding: 15px;
    padding-bottom: 0px;
    overflow: hidden;
}
.livrelist .card-item .card .card-body .info{
    height: 65%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.livrelist .card-item .card .card-body .info h4 , 
.livrelist .card-item .card .card-body .info span{
    margin: 0;
    line-height: 24px;
}
.livrelist .card-item .card .card-body .info h4{
    width: 60%;
}
.livrelist .card-item .card .card-body .info span{
    width: 40%;
    text-align: right;
}
.livrelist .card-item .card .border-container{
    width: 100%;
    display: flex;
    justify-content: center;
}
.livrelist .card-item .card .border-container .border{
    width: 20%;
    height: 4px;
    transition: 500ms;
    background-image: linear-gradient(to right, #6a53e0, #937ce9);
    align-self: center;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    margin-top: 15px;
}
.livrelist .card-item .card:hover .border-container .border{
    width: 100%;
}
</style>