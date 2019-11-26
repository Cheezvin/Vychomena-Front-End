<template>
    <v-container>
        <h2 class="text-md-center mt-5">ITEM</h2>
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
            ADD ITEM
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
                                <td>{{ item.nama }}</td>
                                <td>{{ item.kategori }}</td>
                                <td>{{ item.stok }}</td>
                                <td>{{ item.harga }}</td>
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
    <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
            <v-card-title>
                <span class="headline">ITEM</span>
                </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Name*" v-model="form.nama" required></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="6" md="4">
                            <v-select :items="kategori" v-model="form.kategori" label="Category"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Stock*" v-model="form.stok" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Image" v-model="form.gambar"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Description*" v-model="form.deskripsi" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Price*" prefix="Rp" v-model="form.harga" required></v-text-field>
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
            dialog: false,
            keyword: '',
            kategori: ['Men','Women', 'Kids'],
            headers: [
                {
                    text:'Id',
                    value:'id',
                },
                {
                    text:'Product Name',
                    value:'nama'
                },
                {
                    text:'Category',
                    value:'kategori'
                },
                {
                    text:'Stock',
                    value:'stok'
                },
                {
                    text:'Price (Rp)',
                    value:'harga'
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
            file_data: '',
            form_data: {},
            form: {
                nama: '',
                kategori: '',
                stok: '',
                harga: '',
                gambar: '',
                deskripsi: ''
                },
                item:new FormData,
                typeInput: 'new',
                errors: '',
                updatedId: '',
                }
            },
            methods: {
                getData() {
                    var uri = this.$apiUrl + '/item'
                    this.$http.get(uri).then(response => {
                        this.items=response.data.message
                        })
                    },
                sendData() {
                    this.item.append('nama',this.form.nama);
                    this.item.append('kategori',this.form.kategori);
                    this.item.append('stok',this.form.stok);
                    this.item.append('harga',this.form.harga);
                    this.item.append('gambar',this.form.gambar);
                    this.item.append('deskripsi',this.form.deskripsi);
                    var uri=this.$apiUrl + '/item'
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
                    this.item.append('kategori',this.form.kategori);
                    this.item.append('stok',this.form.stok);
                    this.item.append('harga',this.form.harga);
                    this.item.append('gambar',this.form.gambar);
                    this.item.append('deskripsi',this.form.deskripsi);
                    var uri=this.$apiUrl + '/item/' + this.updatedId;
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
                    this.form.kategori = item.kategori,
                    this.form.stok = item.stok,
                    this.form.deskripsi = item.deskripsi,
                    this.form.gambar = item.gambar,
                    this.form.harga = item.harga,
                    this.updatedId = item.id
                },
                deleteData(deleteId){ //mengahapus data
                var uri=this.$apiUrl + '/item/' + deleteId; //data dihapus berdasarkan id
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
                            kategori : '',
                            stok : '',
                            harga : '',
                            gambar : '',
                            deskripsi : ''
                        }
                    }
                },
        upload() {
            this.file_data = $('#image').prop('files')[0];
            this.form_data = new FormData();
            this.form_data.append('file', this.file_data);
            let url = "http://backend.xbanana.id/item/upload/do_upload";
            var self = this
                axios
                    .post(url, this.form_data).then((res) => {
                        if (res.data.success) {
                            $('#image-display').attr('src', res.data.success)
                        }
                        if (res.data.error) {
                            $('#error').html(res.data.error)
                        }
                    });
        },
    mounted(){
        if(localStorage.getItem('email') == "admin")
        {
            this.$router.push({ path : "item"})
        }
        else{
            this.$router.push({ path : "home"})
        }
        this.getData();
        },
    }
</script>