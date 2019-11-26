<template>
    <v-container>
        <h2 class="text-md-center mt-5 mb-5">USER LIST</h2>
        <v-card>
            <v-container grid-list-md mb-0>
            <v-layout row wrap style="margin:10px">
                <v-flex xs6 class="text-right">
                    <v-text-field
                    v-model="keyword"
                    append-icon="mdi-search"
                    label="Search"
                    hide-details
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-data-table
                :headers="headers"
                :items="users"
                :search="keyword"
                :loading="load"
                >
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index+1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.alamat }}</td>
                                <td class="text-center">
                                    <v-btn
                                    icon
                                    color="error"
                                    light
                                    @click="deleteData(item.id)"
                                    >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-container>
    </v-card>
    <v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="true"
        :timeout="3000"
        >
        {{ text }}
        <v-btn
        dark
        text
        @click="snackbar=false"
        >
        Close
        </v-btn>
    </v-snackbar>
</v-container>
</template>
<script>
export default {
    data() {
        return {
            keyword: '',
            headers: [
                {
                    text:'Id',
                    value:'id',
                },
                {
                    text:'Name',
                    value:'nama'
                },
                {
                    text:'Email',
                    value:'email'
                },
                {
                    text:'Address',
                    value:'alamat'
                },
                {
                    text:'Action',
                    value:null
                },
            ],
            users:[],
            snackbar: false,
            color: null,
            text: '',
            load:false,
            form: {
                nama: '',
                email: '',
                alamat: ''
                },
                user:new FormData,
                typeInput: 'new',
                errors: '',
                updatedId: '',
                }
            },
            methods: {
                getData() {
                     var config = {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }
                    var uri = this.$apiUrl + '/user'
                    this.$http.get(uri,config).then(response => {
                        this.users=response.data.message
                        })
                    },
                sendData() {
                    this.user.append('nama',this.form.nama);
                    this.user.append('email',this.form.email);
                    this.user.append('alamat',this.form.alamat);
                    var uri=this.$apiUrl + '/user'
                    this.load=true 
                    this.$http.post(uri,this.user).then(response=>{
                        this.snackbar=true; //mengaktifkan snackbar
                        this.color='green'; //memberi warna snackbar
                        this.text=response.data.message; //memasukkan pesan kesnackbar

                        this.load=false;
                        this.dialog=false
                        this.getData(); //mengambil data user 
                        this.resetForm();
                    }).catch(error =>{
                        this.errors = error
                        this.snackbar = true;
                        this.text = 'Try Again';
                        this.color = 'red';
                        this.load = false;
                    })
                },
                deleteData(deleteId){ //mengahapus data
                var uri=this.$apiUrl + '/user/' + deleteId; //data dihapus berdasarkan id
                this.$http.delete(uri).then(response=>{
                        this.snackbar = true;
                        this.text = response.data.message;
                        this.color = 'green'
                        this.deleteDialog = false;
                        this.getData()
                    ;}).catch(error => {
                        this.errors = error
                        this.snackbar = true;
                        this.text = 'Try Again';
                        this.color = 'red';
                    })
                },
                setForm(){
                    if (this.typeInput === 'new'){
                        this.sendData()
                    } else {
                        console.log("dddd")
                        }
                    },
                    resetForm(){
                        this.form = {
                            nama : '',
                            email : '',
                            alamat : ''
                        }
                    }
                },
        mounted(){
            if(localStorage.getItem('email') == "admin")
            {
                this.$router.push({ path : "user"})
            }
            else
            {
                this.$router.push({ path : "home"})
            }
            this.getData();
            },
        }
</script>