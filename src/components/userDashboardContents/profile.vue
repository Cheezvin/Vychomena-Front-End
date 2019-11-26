<template>
    <div class="ma-5 pa-5">
        <v-container class="grey lighten-5" v-model="users">
            <v-card class="pa-2" outlined tile>
            <v-row>
                <v-col md="4">
                    <v-card class="grey lighten-2">
                        <v-img src="../../assets/Nicho.jpg" width="400" height="400">
                        </v-img>
                    </v-card>
                </v-col>
                <v-col>
                    <v-row class="pb-10">
                        <v-col>
                            Nama : {{users.nama}}
                        </v-col>
                    </v-row>
                    <v-row class="pb-10">
                        <v-col>Email : {{users.email}}                         
                        </v-col>
                    </v-row>
                    <v-row class="pb-10">
                        <v-col>
                            Phone Number : {{users.nohp}}
                        </v-col>
                    </v-row>
                    <v-row class="pb-10">
                        <v-col>
                            Address : {{users.alamat}}
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-row align="center">
                    <div class="my-2">
                        <v-btn color="success" dark large @click="editHandler(users)">EDIT PROFILE</v-btn>
                    </div>
                </v-row>
            </v-card-actions>
            </v-card>
            <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">EDIT PROFILE</span>
                </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Name*" v-model="form.nama" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Phone Number*" v-model="form.nohp" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Address*" v-model="form.alamat" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog=false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="updateData()" href="/profile">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
        </v-container>
    </div>
</template>

<script>
export default {
    data:() => ({
            dialog:false,
            users: [],
            user:new FormData,
            email: localStorage.getItem('myemail'),
            form: {
                nama: '',
                nohp: '',
                alamat: ''
            },
    }),
    methods: {
            getDatabyEmail(em) {
                var uri = this.$apiUrl + '/user/getbyemail';
                this.$http.post(uri,{
                    email: em
                }).then(response => {
                this.users = response.data.message;
                })
            },
            updateData(){
                this.user.append('nama',this.form.nama);
                this.user.append('nohp',this.form.nohp);
                this.user.append('alamat',this.form.alamat);
                var uri=this.$apiUrl + '/user/' + this.updatedId;
                this.load=true
                this.$http.post(uri,this.user).then(response=>{
                    this.snackbar=true; //mengaktifkan snackbar
                    this.color = 'green'; //memberi warna snackbar
                    this.text = response.data.message; //memasukkan pesan kesnackbar
                    this.load = false;
                    this.dialog = false
                    this.getData(); //mengambil data item
                    this.resetForm();
                    this.typeInput='new';
                }).catch(error =>{
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                    this.typeInput = 'new';
                })
            },
            editHandler(users){
                this.typeInput = 'edit';
                this.dialog = true;
                this.form.nama = users.nama,
                this.form.email = users.email,
                this.form.nohp = users.nohp,
                this.form.alamat = users.alamat,
                this.updatedId = users.id
            },
    },
    mounted(){
        this.getDatabyEmail(this.email)
        if(!localStorage.getItem('token'))
        {
            this.$router.push({ path : "login"})
        }
    }
}
</script>
