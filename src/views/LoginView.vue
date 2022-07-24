<template>
  <div class="login mt-5">
    <div class="box">
      <div class="img-fond">
        <img src="@/assets/img/fond.jpg"/>
      </div>
      <div class="formulaire">
        <div class="title">
          <h3>Connexion</h3>
        </div>
        <div class="content">
          <div v-if="msg != '' && alert == true" class="alert">
            {{msg}}
            <span @click="closeAlert()">x</span>
          </div>
          <form @submit.prevent="connexion()">
            <label for="email">Email :</label>
            <input v-model="email" id="email" type="email" placeholder="Email"/>

            <label for="password">Mot de passe :</label>
            <input v-model="password" id="password" type="password" placeholder="Password"/>

            <button class="btn-primary">Connexion</button>
          </form>
        </div>
      </div>
		</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import http from '@/axios';

export default defineComponent({
  name: "LoginView",
  data(){
    return{
      msg: '',
      alert: false,
      email: '',
      password: '',
    }
  },
  methods: {
    connexion(){
      http.post("/perso/login", {
        email: this.email,
        password: this.password
      }).then((response) => {
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token)
      })
    }
  }
})
</script>
<style scoped>
.login .box{
	background-color: white;
  margin: 30px;
	display: flex;
  justify-content: space-between;
}
.login .box .formulaire{
  width: 45%;
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
  width: 55%;
  height: 500px;
}
.login .box .img-fond img{
  width: 100%;
  height: 500px;
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
