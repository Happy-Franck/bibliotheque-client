<template>
  <div class="login mt-5">
		<div class="box">
      <div class="formulaire">
        <div class="title">
          <h3>Inscription</h3>
        </div>
        <div class="content">
          <div class="alert" v-if="alert === true">
            Pseudo déjà pris
            <span @click="closeAlert()">x</span>
          </div>
          <form @submit.prevent="connexion()">
            <label for="email">Email :</label>
            <input v-model="email" id="email" type="email" placeholder="Email"/>

            <label for="password">Mot de passe :</label>
            <input v-model="password" id="password" type="password" placeholder="Password"/>

            <div class="duo">
              <div class="form-group">
                <label for="pseudo">Pseudo :</label>
                <input v-model="pseudo" id="pseudo" type="text" placeholder="Pseudo"/>
              </div>
              <div class="form-group">
                <label for="tel">Téléphone :</label>
                <input v-model="tel" id="tel" type="number" min="0" placeholder="03* ** *** **"/>
              </div>
            </div>

            <label for="adresse">Adresse :</label>
            <input v-model="adresse" id="adresse" type="text" placeholder="Ton adresse..."/>

            <label for="role">Role :</label>
            <select v-model="role">
              <option value="idadmin">Admin</option>
              <option value="idLivreur">Livreur</option>
              <option value="idUser">User</option>
            </select>

            <button class="btn-primary">Créer le compte</button>
          </form>
        </div>
      </div>
      <div class="img-fond">
        <img src="@/assets/img/fond.jpg"/>
      </div>
		</div>
  </div>
<!-- -CreatePersonne : fonction pour créer une personne
        *url: http://localhost:8081/perso/create
        *data request: {pseudo: string,email: string,password: string,photo: string,tel: string,adresse: string, role: string}
        *type request: post
        *parameters url: none
        *return: status400 {message: "Des éléments sont vides!"},status201 {message: "creation reussite"},status500 {message: error} -->
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from 'axios';

export default defineComponent({
  name: "LoginView",
  data(){
    return{
      alert: false,
      email: '',
      password: '',
      pseudo: '',
      tel: '',
      adresse: '',
      role: '',
    }
  },
  methods: {
    connexion(){
      console.log("ok")
      axios.post('http://localhost:9000/perso/create',{
        email : 'this.email',
        password : 'this.password',
        pseudo : 'this.pseudo',
        tel : 'this.tel',
        adresse : 'this.adresse',
        role : 'this.role',
        photo : 'no image'
      }).then(
        (response) => {
          if(response){
            console.log(response)    
          }
        }
      )
      console.log("ko")
    },
    closeAlert(){
      this.alert = false
    }
  }
});
</script>
<style scoped>
.login .box{
	background-color: white;
  margin: 30px;
	display: flex;
  justify-content: space-between;
}
.login .box .formulaire{
  width: 50%;
	padding: 45px;
  padding-bottom: 0;
}
.login .box .formulaire .title h3{
	margin: 0;
	padding-bottom: 25px; 
  text-align: center;
	font-size: 24px;
}
.login .box .formulaire .content .alert{
  background: #e9ecf1;
  border-radius: 3px;
  padding: 18px;
  display: flex;
  justify-content: space-between;
} 
.login .box .formulaire .content .alert span{
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  border: 1px solid #937ce9;
  color: #6a53e0;
  border-radius: 3px;
  cursor: pointer;
} 
.login .box .formulaire .content form{
  display: flex;
  flex-direction: column;
}
.login .box .formulaire .content form .duo{
  display: flex;
  justify-content: space-between;
}
.login .box .formulaire .content form .duo .form-group{
  width: 48%;
  display: flex;
  flex-direction: column;
}
.login .box .formulaire .content form input , .login .box .formulaire .content form select{
  height: 34px;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
	border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 3px;
  background: white;
}
.login .box .formulaire .content form label{
  margin-top: 15px;
  margin-bottom: 4px;
}
.login .box .formulaire .content form button{
  margin-top: 15px;
  margin-bottom: 4px;
}
.login .box .img-fond{
  width: 50%;
  height: 625px;
}
.login .box .img-fond img{
  width: 100%;
  height: 625px;
  object-fit: cover;
}
/* Medium devices (tablets, 768px and up)*/
@media (max-width: 768px){
  .login .box{
    flex-direction: column;
  }
  .login .box .formulaire{
    width: auto;
	padding-bottom: 45px;
  }
  .login .box .img-fond{
    display: none;
  }
}
</style>
