<template>
    <v-container class="d-inline-flex mt-10 ml-12 pl-12" >    
          
        <v-layout class="ml-12 mr-auto d-inline-flex border border-dark" v-model="shopdetail"> 
            <v-img :src="require('../../assets/'+shopdetail.gambar)" height="200" max-width="320"></v-img>
            <div class="ml-12">
                <h1>{{shopdetail.nama}}</h1>
                <h4>{{shopdetail.deskripsi}}</h4>   
                <br>
                <v-card-text class="pt-0">
                 
            <v-slider
                v-model="value"
                label="How many?"
                min="1 "
                max="10"
                thumb-label="always"
            ></v-slider>
                 </v-card-text>
                <h3>Rp. {{shopdetail.harga}}</h3>   
                <v-btn
                class="mt-2"
                route to="/cart"
                @click="sendData()"
                color="success"         
                >
                Buy Now
              </v-btn>  
            </div>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data:() => ({    
            shopdetail: [],
            qty:0,
            value:0,
            email: localStorage.getItem('myemail'),
        }),
        methods: {
            getData() {
                var uri = this.$apiUrl + '/item'
                this.$http.get(uri).then(response => {
                    this.shopdetail = response.data.message
                })
            },
            getDatabyId(id) {
                this.shopdetail = []
                var uri = this.$apiUrl + '/item/getbyid/' + id
                this.$http.get(uri).then(response => {
                    this.shopdetail = response.data.message
                })
            },
            sendData() {
                var uri = this.$apiUrl + '/cart';
                this.$http.post(uri, {
                    id: '',
                    nama: this.shopdetail.nama,
                    iditem: Number(this.shopdetail.id),
                    gambar: this.shopdetail.gambar,
                    harga: Number(this.shopdetail.harga),
                    jumlah: this.value,
                    email: this.email
                });
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
                    '/cart/' + deleteID; //data dihapus berdasarkan id
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
            if(!localStorage.getItem('token'))
            {
                this.$router.push({ path : "login"})
            }
            this.id = this.$route.params.id;
            this.getDatabyId(this.id)
        },
    } 
</script>