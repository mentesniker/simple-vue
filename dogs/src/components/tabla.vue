<template>
  <div class="tabla">
    <h1>Perritos en la base</h1>
    <table>
        <tr>
            <th>Id</th>
            <th>Raza</th>
        </tr>
        <tr v-for="perrito in perros" v-bind:key="perrito.id">
            <td>
                {{ perrito.id }}
            </td>
            <td>
                {{ perrito.name }}
            </td>
        </tr> 
        
    </table>
    <button v-on:click="pideDatos">Pide perros</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
      return {
          perros: []
      }
  },
  methods: {
      pideDatos: function(){
          axios.get('https://api.thedogapi.com/v1/breeds?limit=10&page=0', {
              xApiKey: '428e18b8-8f20-408d-a40d-708c4cae48d1'
          }).then(response => {
                console.log("enviado");
                console.log(response);
                this.perros = response.data;
            }).catch(error => {
                console.log(error.response.status);
                console.log(error.response.data);
           });
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabla {
    margin: 20%;
}
table {
    margin-left: 25%;
}
</style>