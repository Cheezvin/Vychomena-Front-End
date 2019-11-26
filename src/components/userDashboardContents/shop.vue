<template>
  <v-container>

      <v-tabs
    fixed-tabs
    background-color="dark"
    dark
    class="col-6 ml-auto mr-auto"
  >
    <v-tab @click="getData()" >
      All
    </v-tab>
    <v-tab @click="men()" >
      Men
    </v-tab>
    <v-tab @click="women()">
      Women
    </v-tab>
    <v-tab @click="kids()">
      Kids
    </v-tab>
  </v-tabs>

    <v-layout v-model="data" v-for="(item,i) in shoplist" :key="i" class="d-inline-flex mt-4">
      <v-card
          max-width="320"
          class="mx-auto ml-7"
          elevation="20"
          :to="{ name: 'detail', params: { id: item.id } }"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline text-center">{{item.nama}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-img
            :src="require('../../assets/'+item.gambar)"
            height="200"
          ></v-img>

          <v-card-text>
            {{item.deskripsi}}
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="black accent-4"
            >
            Rp {{item.harga}}
            </v-btn>
            <v-btn
              text
              color="black accent-4"
            >
            {{item.kategori}}
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        data() {
            return { 
                shoplist: [],
                data1: [],
                data: false
            }
        },
        methods: {
            getData() {
                this.shoplist = []
                var uri = this.$apiUrl + '/item'
                this.$http.get(uri).then(response => {
                    this.shoplist = response.data.message
                })
            },
            women() {
                this.shoplist= []
                var uri = this.$apiUrl + '/item/getbykategori/Women'
                this.$http.get(uri).then(response => {
                    this.shoplist = response.data.message
                })
            },
            men() {
                this.shoplist= []
                var uri = this.$apiUrl + '/item/getbykategori/Men'
                this.$http.get(uri).then(response => {
                    this.shoplist = response.data.message
                })
            },
            kids() {
                this.shoplist= []
                var uri = this.$apiUrl + '/item/getbykategori/Kids'
                this.$http.get(uri).then(response => {
                    this.shoplist = response.data.message
                })
            },
            sendData() {
                this.user.append('name', this.form.name);
                this.user.append('price', this.form.price);
                this.user.append('type', this.form.type);
                
                var uri = this.$apiUrl + '/user'
                this.load = true
                this.$http.post(uri, this.user).then(response => {
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'green'; //memberi warna snackbar
                    this.text = response.data.message; //memasukkan pesan ke snackbar
                    this.load = false;
                    this.dialog = false;
                    this.getData(); //mengambil data user
                    this.resetForm();
                }).catch(error => {
                    this.errors = error;
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                })
            },
            updateData() {
                this.user.append('name', this.form.name);
                this.user.append('price', this.form.price);
                this.user.append('type', this.form.type);
              
                var uri = this.$apiUrl + '/user/' + this.updatedId;
                this.load = true
                this.$http.post(uri, this.user).then(response => {
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'green'; //memberi warna snackbar
                    this.text = response.data.message; //memasukkan pesan ke snackbar
                    this.load = false;
                    this.dialog = false
                    this.getData(); //mengambil data user
                    this.resetForm();
                    this.typeInput = 'new';
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                    this.typeInput = 'new';
                })
            },
            editHandler(item) {
                this.typeInput = 'edit';
                this.dialog = true;
                this.form.name = item.name;
                this.form.price = item.price;
                this.form.type = item.type,
              
                this.updatedId = item.id
            },
            deleteData(deleteID) { //mengahapus data
                var uri = this.$apiUrl +
                    '/user/' + deleteID; //data dihapus berdasarkan id
                this.$http.delete(uri).then(response => {
                    this.snackbar = true;
                    this.text = response.data.message;
                    this.color = 'green'
                    this.deleteDialog = false;
                    this.getData();
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                })
            },
            setForm() {
                if (this.typeInput === 'new') {
                    this.sendData()
                } else {
                   // console.log("dddd")
                    this.updateData()
                }
            },
            resetForm() {
                this.form = {
                    name: '',
                    price: '',
                    type: '',
                }
            }
        },
      mounted() {
        this.getData();
      }
    } 
</script>

