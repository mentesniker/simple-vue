<template>
    <div class="overflow-auto">
        <NavBar></NavBar>

    <h1 style="margin-top: 3%;">Perros en la base de datos</h1>
    <b-button v-b-modal.agregar variant="success" size="lg">Agregar Nuevo</b-button>
    <b-table
      id="my-table"
      hover
      :items="perros"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
      small>
        <template #cell(url)="data">
            <img :src="data.item.url" />
        </template>

        <template #cell(actions)="data">
            <b-button v-b-modal.borrar v-on:click="setSeleccion(data.item.id)" variant="danger">Borrar</b-button>&nbsp;&nbsp;
            <b-button v-b-modal.subir v-on:click="setSeleccion(data.item.id)" variant="info">Subir foto</b-button>
        </template>
    </b-table>
        <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <div>

  <b-modal id="borrar" title="Borrar" @ok="borraLomito()">
    <p class="my-4">¿Estas seguro que deseas borrar el perro seleccionado?</p>
  </b-modal>

  <b-modal id="subir" title="" @ok="fotoLomito()">
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Subir foto</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="save($event.target.files)"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading files...
            </p>
        </div>
      </form>
  </b-modal>

  <b-modal id="agregar" title="BootstrapVue" @ok="agregaPerro()">
    <label for="nombrePerro">Nombre del perro</label>
    <b-form-input id="nombrePerro" type="text" v-model="perroNuevoNombre"></b-form-input>
  </b-modal>

  <div class="float-right" v-show="loading">
  <b-spinner type="grow" ></b-spinner>
  <b-spinner variant="primary" type="grow" ></b-spinner>
  <b-spinner variant="success" type="grow"></b-spinner>
</div>


</div>
  </div>
</template>

<script>
import router from '../router';
import store from '../utils/store';
import NavBar from './NavBar.vue';
import axios from 'axios';
export default {
  data: function () {
      return {
        perroNuevoNombre: "",
        perPage: 3,
        currentPage: 1,
        perros: [],
        seleccionado: 0,
        fields: [{
            key: "nombre",
            label: "Nombre"
            },
            {
            key: "pertenece",
            label: "¿Adoptado?"
            },
            {
            key: "url",
            label: "Foto"
            },
            {
            key: "actions",
            label: "Acciones"
            }
        ],
        isSaving: false,
        isInitial: true,
        uploadFieldName: "",
        loading:true
      }
  },
  mounted() {
        
        if (! store.state.jwt) {
            router.push("/")
        }
        axios.get('http://localhost:8080/perro/get-all', 
            { headers: { jwt: store.state.jwt}
        }).then(response => {
                console.log(response.data);
                this.perros = response.data;
                this.perros.forEach((perro) => {
                    if(perro.pertenece !== 0){
                        perro.pertenece = "SI"
                    }
                    else{
                      perro.pertenece = "NO"
                    }
                    perro.url = "file:///home/luis/Desktop/demo-spring-boot/" + perro.url
                } );
            }).catch(error => {
                console.log(error.response.status);
                console.log(error.response.data);
        });
        this.resetFormImage();
        this.loading=false;
  },
  methods:{
    setSeleccion: function(id){
          this.seleccionado = id;
      },
      borraLomito: function(){
          axios.delete('http://localhost:8080/perro/delete/'+this.seleccionado,
            { headers: { jwt: store.state.jwt}
          }).then(response => {
                console.log(response.data);
                this.perritos = this.perros.filter( el => el.id !== this.seleccionado );
            }).catch(error => {
                console.log(error.response.status);
                console.log(error.response.data);
        });
      },
      fotoLomito: function(){
          console.log(this.seleccionado);
      },
      agregaPerro: function(){
        axios.put('http://localhost:8080/perro/insert', {
                nombre: this.username,},
              { headers: 
                { jwt: store.state.jwt}}).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error.response.status);
                console.log(error.response.data);
           });
      },
      resetFormImage: function(){
        this.isSaving= false;
        this.isInitial= true;
        this.uploadFieldName= "";
      },
      save: function( fileList){
        const formData = new FormData();
        formData.append("file", fileList[0], fileList[0].name);
        this.isSaving= true;
        this.isInitial= false;
        this.uploadFieldName= "";
        axios.put('http://localhost:8080/perro/upload/'+this.seleccionado, formData, 
        { headers: 
                { jwt: store.state.jwt,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
                }}).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error.response.status);
                console.log(error.response.data);
           });
        this.isSaving= false;
        this.isInitial= true;
        this.uploadFieldName= "";
        this.$bvModal.hide("subir")
      }
  },
   computed: {
      rows() {
        return this.perros.length
      }
    },
    components: {
        'NavBar': NavBar
    }
}
</script>

<style>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>