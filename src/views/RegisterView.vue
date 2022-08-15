<template>
  <div class="register mt-5">
		<div class="box">
      <div class="formulaire">
        <div class="title">
          <h3>Inscription</h3>
        </div>
        <div class="content">
          <div v-if="msg != '' && alert == true" class="alert">
            {{msg}}
            <span @click="closeAlert()">x</span>
          </div>
          <form @submit.prevent="register()">
            <label for="email">Email :</label>
            <input required v-model="email" id="email" type="email" placeholder="Email"/>

            <label for="password">Mot de passe :</label>
            <input required v-model="password" id="password" type="password" placeholder="Password"/>

            <div class="duo">
              <div class="form-group">
                <label for="pseudo">Pseudo :</label>
                <input required v-model="pseudo" id="pseudo" type="text" placeholder="Pseudo"/>
              </div>
              <div class="form-group">
                <label for="tel">Téléphone :</label>
                <input required v-model="tel" id="tel" type="number" min="0" placeholder="03* ** *** **"/>
              </div>
            </div>

            <label for="adresse">Adresse :</label>
            <input required v-model="adresse" id="adresse" type="text" placeholder="Ton adresse..."/>
            
            <button class="btn-primary">Créer le compte</button>
          </form>
        </div>
      </div>
      <div class="img-fond">
        <img src="@/assets/img/fond.jpg"/>
      </div>
		</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import http from '@/axios';

export default defineComponent({
  name: "RegisterView",
  data(){
    return{
      msg: '',
      alert: false,
      email: '',
      password: '',
      pseudo: '',
      tel: '',
      adresse: '',
      role: '',
      roles: []
    }
  },
  created(){
    http.get("/role/get").then(
      (response) => {
        if (response){
          this.roles = response.data
          for(let i= 0; i < this.roles.length; i++){
            if(this.roles[i].name == 'user'){
              this.role = this.roles[i]._id
            }
          }
        }
      }
    )
  },
  methods: {
    register(){
      http.post("/perso/create",
      {
        email : this.email,
        password : this.password,
        pseudo : this.pseudo,
        tel : this.tel,
        adresse : this.adresse,
        role : this.role,
        photo : 'no image'
      }).then(
        (response) => {
          if(response.data.message){
            this.msg = response.data.message 
            this.alert = true
          }
          else if(response.data.msgemail){
            this.msg = response.data.msgemail
            this.alert = true
          }
        }
      ).catch(
        (error) => {
          if(error){
            console.log(error)
          }
        }
      )
    },
    closeAlert(){
      this.alert = false
      this.msg = ''
    }
  }
});
</script>
<style scoped>
.register .box{
	background-color: white;
  margin: 30px;
	display: flex;
  justify-content: space-between;
}
.register .box .formulaire{
  width: 45%;
	padding: 45px;
  padding-bottom: 0;
}
.register .box .formulaire .title h3{
	margin: 0;
	padding-bottom: 25px; 
  text-align: center;
	font-size: 24px;
}
.register .box .formulaire .content .alert{
  background: #e9ecf1;
  border-radius: 3px;
  padding: 18px;
  display: flex;
  justify-content: space-between;
} 
.register .box .formulaire .content .alert span{
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  border: 1px solid #937ce9;
  color: #6a53e0;
  border-radius: 3px;
  cursor: pointer;
} 
.register .box .formulaire .content form{
  display: flex;
  flex-direction: column;
}
.register .box .formulaire .content form .duo{
  display: flex;
  justify-content: space-between;
}
.register .box .formulaire .content form .duo .form-group{
  width: 48%;
  display: flex;
  flex-direction: column;
}
.register .box .formulaire .content form input , .register .box .formulaire .content form select{
  height: 34px;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
	border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 3px;
  background: white;
}
.register .box .formulaire .content form label{
  margin-top: 15px;
  margin-bottom: 4px;
}
.register .box .formulaire .content form button{
  margin-top: 15px;
  margin-bottom: 4px;
}
.register .box .img-fond{
  width: 55%;
  height: 625px;
}
.register .box .img-fond img{
  width: 100%;
  height: 625px;
  object-fit: cover;
}
/* Medium devices (tablets, 768px and up)*/
@media (max-width: 768px){
  .register .box{
    flex-direction: column;
  }
  .register .box .formulaire{
    width: auto;
	padding-bottom: 45px;
  }
  .register .box .img-fond{
    display: none;
  }
}
.role{
  visibility: hidden;
}
</style>
