<template>
    <v-container>
        <h2 class="text-md-center mt-5">VOUCHER</h2>
        <v-flex mb-5>
            <v-btn
            depressed
            dark
            rounded
            style="text-transform: none !important;"
            color="green accent-3"
            @click="dialog=true"
            >
            <v-icon size="18" class="mr-2">mdi-plus</v-icon>
            ADD VOUCHER
            </v-btn>
        </v-flex>
        <v-card mt-5>
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
                :items="items"
                :search="keyword"
                :loading="load"
                >
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index+1 }}</td>
                                <td>{{ item.kode }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.total }}</td>
                                <td class="text-center">
                                    <v-btn 
                                    icon
                                    color="indigo"
                                    light
                                    @click="editHandler(item)"
                                    >
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
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
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">VOUCHER</span>
                </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="CODE*" v-model="form.kode" required></v-text-field>
                        </v-col>
                         <v-col cols="12">
                            <v-text-field label="NAME*" v-model="form.nama" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="TOTAL*" v-model="form.total" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog=false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
            selectedFile: null,
            dialog: false,
            keyword: '',
            headers: [
                {
                    text:'Id',
                    value:'id',
                },
                {
                    text:'Code',
                    value:'kode'
                },
                {
                    text:'Name',
                    value:'nama'
                },
                {
                    text:'Total (%)',
                    value:'total'
                },
                {
                    text:'Action',
                    value:null
                },
            ],
            items:[],
            snackbar: false,
            color: null,
            text: '',
            load:false,
            form: {
                nama: '',
                kode: '',
                total: ''
            },
            item:new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
            }
            },
            methods: {
                onFileChanged (event) {
                    this.selectedFile = event.target.files[0]
                },
                onUpload() {
                    // upload file, get it from this.selectedFile
                    axios.post('my-domain.com/file-upload', this.selectedFile)
                },
                getData() {
                    var uri = this.$apiUrl + '/voucher'
                    this.$http.get(uri).then(response => {
                        this.items=response.data.message
                        })
                    },
                sendData() {
                    this.item.append('nama',this.form.nama);
                    this.item.append('kode',this.form.kode);
                    this.item.append('total',this.form.total);
                    var uri=this.$apiUrl + '/voucher'
                    this.load=true 
                    this.$http.post(uri,this.item).then(response=>{
                        this.snackbar=true; //mengaktifkan snackbar
                        this.color='green'; //memberi warna snackbar
                        this.text=response.data.message; //memasukkan pesan kesnackbar

                        this.load=false;
                        this.dialog=false
                        this.getData(); //mengambil data item 
                        this.resetForm();
                    }).catch(error =>{
                        this.errors = error
                        this.snackbar = true;
                        this.text = 'Try Again';
                        this.color = 'red';
                        this.load = false;
                    })
                },
                updateData(){
                    this.item.append('nama',this.form.nama);
                    this.item.append('kode',this.form.kode);
                    this.item.append('total',this.form.total);
                    var uri=this.$apiUrl + '/voucher/' + this.updatedId;
                    this.load=true
                    this.$http.post(uri,this.item).then(response=>{
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
                editHandler(item){
                    this.typeInput = 'edit';
                    this.dialog = true;
                    this.form.nama = item.nama,
                    this.form.kode = item.kode,
                    this.form.total = item.total,
                    this.updatedId = item.id
                },
                deleteData(deleteId){ //mengahapus data
                var uri=this.$apiUrl + '/voucher/' + deleteId; //data dihapus berdasarkan id
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
                    if (this.typeInput == 'new'){
                        this.sendData()
                    } else {
                        console.log("dddd")
                        this.updateData()
                        }
                    },
                    resetForm(){
                        this.form = {
                            nama : '',
                            kode : '',
                            total : ''
                        }
                    }
                },
    mounted(){
        if(localStorage.getItem('email') == "admin")
        {
            this.$router.push({ path : "voucher"})
        }
        else{
            this.$router.push({ path : "home"})
        }
        this.getData();
    },
}
</script>