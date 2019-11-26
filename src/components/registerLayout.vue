<template>
<v-container>
<div>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-3">
      <v-img class="font-weight-bold display-3 basil--text"><a href="/home"><img src="../assets/Vychomena.png" style="height:30px"></a></v-img>
    </v-card-title>
  </v-card>
</div>
  <v-card
    style="margin-top: 50px; margin-bottom: 50px; padding: 15px"
    class="mx-auto"
    max-width="400"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <span class="headline text-center justify-center">REGISTER</span>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" v-model="form.nama" required></v-text-field>
              </v-col>
              <v-col cols="12" style="margin-top: -30px">
                <v-text-field label="Email" v-model="form.email" required></v-text-field>
              </v-col>
              <v-col cols="12" style="margin-top: -30px">
                <v-text-field label="Phone Number" type="phone-number" v-model="form.nohp"></v-text-field>
              </v-col>
              <v-col cols="12" style="margin-top: -30px">
                <v-text-field label="Address" v-model="form.alamat"></v-text-field>
              </v-col>
              <v-col cols="12" style="margin-top: -30px">
                <v-text-field label="Password" type="password" v-model="form.password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions class="text-center justify-center">
      <v-btn color="success" @click="sendData()">SIGN-UP</v-btn>
    </v-card-actions>
     <v-col cols="12">
        <p class="text-center justify-center">Have yet registered?  <a href="/login">Login</a></p>
      </v-col>
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
        users:[],
        snackbar: false,
        color: null,
        text: '',
        load:false,
        form: {
            nama: '',
            alamat: '',
            nohp: '',
            email: '',
            password: ''
            },
            user:new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
            }
        },
        methods:  {
            doneRegister()
            {
                this.$router.push({name : "loginLayout"})
            },
            sendData() {
                this.user.append('nama',this.form.nama);
                this.user.append('email',this.form.email);
                this.user.append('alamat',this.form.alamat);
                this.user.append('nohp',this.form.nohp);
                this.user.append('password',this.form.password);
                var uri=this.$apiUrl + '/user'
                this.load=true 
                this.$http.post(uri,this.user).then(response=>{
                    this.snackbar=true; //mengaktifkan snackbar
                    this.color='green'; //memberi warna snackbar
                    this.text=response.data.message; //memasukkan pesan kesnackbar
                    this.load=false;
                    this.$router.push({path : "login"})
                }).catch(error =>{
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                })
            },
        }
}
</script>