
<template>
<div>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-3">
      <v-img style="margin-left:55px" class="font-weight-bold display-3 basil--text"><a href="/home"><img src="../assets/Vychomena.png" style="height:30px"></a></v-img>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2" fab dark small="" color="black"
            v-on="on"
          >
            <v-icon light>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item key="Dashboard" link to ="item">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item key="Login" link :to="logLink">
            <v-list-item-title>{{ logName }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
            
    </v-card-title>
    <v-tabs
        v-model="tab"
        background-color="transparent"
        centered
    >
      <v-tab
        v-for="item in items"
        :key="item.title"
        link
        :to="item.path"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat color="basil">
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  <VContent >
      <router-view />
  </VContent>
</div>
</template>

<script>
export default {
    data() {
        return {
            logName: '',
            logLink: '',
            drawer: null,
            items: [
                { title: 'User', path: 'user' },
                { title: 'Item', path: 'item'},
                { title: 'Voucher', path: 'voucher'},
            ],
        }
    },
    mounted(){
      if(localStorage.getItem('token'))
      {
          this.logName = "Logout";
          this.logLink = "logout";
      }
      else
      {
          this.logName = "Login";
          this.logLink = "login";
      }
    },
}
</script>

<style>
/* Helper classes */
.basil {
  background-color: #FFFFFF !important;
}
.basil--text {
  color: #356859 !important;
}
</style>