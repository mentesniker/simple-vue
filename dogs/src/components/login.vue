<template>
<div class="container" style="margin-top: 5%;">
  <div class="row">
    <div class="col">
      
    </div>
    <div class="col">
              <b-card-group deck>
    <b-card
      header="Login"
      header-tag="header"
      title="Inicia Sesion"
    >
     <form>
      <b-form-input type="text" id="login" class="fadeIn second" name="login" placeholder="login" v-model="username"></b-form-input>
      <br>
      <br>
      <b-form-input type="password" id="password" class="fadeIn third" name="login" placeholder="password" v-model="password"></b-form-input>
      <br>
      <br>
       <b-button type="button" variant="primary" v-on:click="pideDatos">Entrar</b-button>
    </form>
     
    </b-card>

  </b-card-group>
    </div>
    <div class="col">
      
    </div>
  </div>
</div>


</template>

<script>
import axios from 'axios';
import store from '../utils/store';
import router from '../router';

export default {
  data: function () {
      return {
          username: "",
          password: ""
      }
  },
  created() {
      if (store.state.jwt) {
        router.push("Perros")
      }
  },
  methods: {
      pideDatos: function(){
          axios.post('http://localhost:8080/administrador/login/', {
                mail: this.username,
                password: this.password,
                rol: "aaaa"
          }).then(response => {
                store.commit("set_jwt", response.data.jwt);
                console.log(store.state.jwt);
                router.push("Perros")
            }).catch(error => {
                console.log(error.response.status);
                console.log(error.response.data);
           });
           
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->