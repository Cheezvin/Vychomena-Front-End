<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">My Cart</h2>
                <v-data-table :headers="headers" :items="services" v-model="total" :hide-default-footer="true">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td><v-img max-width="120" :src="require('../../assets/'+item.gambar)"/></td>
                                <td>
                                    <v-edit-dialog
                                        large
                                        persistent
                                        @save="save(item)"
                                        @cancel="cancel"
                                        @open="open"
                                        @close="close"
                                        >
                                    <div>{{ item.jumlah }}</div>
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="item.jumlah"
                                        label="Edit"
                                        single-line
                                        autofocus
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog></td>
                                <td>IDR {{ item.harga }}</td>
                                <td >
                                    <v-btn icon color="error" light @click="deleteData(item.id)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
                <h1 class="mt-12">Total Price : Rp. {{total}}</h1>
                <br>
                <v-col cols="12" sm="6">
                <v-text-field
                    v-model="Voucher"
                    label="Voucher"
                    outlined
                ></v-text-field>
                 <v-btn
                class="mt-2"
                @click="voucher()"
                color="success"         
                >
                Apply Voucher
              </v-btn>  
                </v-col>
            </v-container>
        </v-card>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false,
                keyword: '',
                total: 0,
                diskon: [],
                Voucher: '',
                headers: [{
                        text: 'No',
                        value: 'no',
                    },
                    {
                        text: 'Name',
                        value: 'nama'
                    },
                    {
                        text: 'Image',
                        value: 'harga'
                    },
                    {
                        text: 'Amount',
                        value: 'jumlah'
                    },
                    {
                        text: 'Price',
                        value: 'harga '
                    },
                    {
                        text: 'Remove',
                        value: null
                    },
                ],
                services: [],
                snackbar: false,
                email: localStorage.getItem('myemail'),
                color: null,
                text: '',
                user: new FormData,
                typeInput: 'new',
                errors: '',
                updatedId: '',
            }
        },
        methods: {
            getData() {
                this.services = []
                var uri = this.$apiUrl + '/cart/getbyemail'
                this.$http.post(uri,{
                    email: this.email
                }).then(response => {
                    this.services = response.data.message
                    this.total = 0
                    for(var i=0;i<this.services.length;i++) {
                        this.total = this.total + (Number(this.services[i].harga) * Number(this.services[i].jumlah))
                    }
                })
            },
            voucher() {
                var uri = this.$apiUrl + '/voucher/getbykode/' + this.Voucher
                this.$http.get(uri).then(response => {
                    this.diskon = response.data.message
                    this.total = this.total - Number(this.diskon.total)
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
            save(item) {
                var uri = this.$apiUrl + '/cart';
                this.$http.post(uri,{
                    id: Number(item.id), 
                    jumlah: Number(item.jumlah)
                }).then(response => {
                    this.getData(); //mengambil data user
                });
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
                    this.getData(); //mengambil data user
                })
            },
            setForm() {
                if (this.typeInput === 'new') {
                    this.sendData()
                } else {
                    console.log("dddd")
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
            this.getData()
            
        },
        created() {
            this.getData()
        },
    } 
</script>