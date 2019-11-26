
<template>
<div>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-3">
      <v-img style="margin-left:100px" class="font-weight-bold display-3 basil--text"><a href="/home"><img src="../assets/Vychomena.png" style="height:30px"></a></v-img>
      <a href="cart"><v-icon color="black" style="margin-right:20px">mdi-cart</v-icon></a>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2" fab dark small="" color="grey-dark"
            v-on="on"
          >
            <v-icon light>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item key="Profile" link :to="dashLink">
            <v-list-item-title>{{ dashName }}</v-list-item-title>
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
        :key="item.id"
        :href="item.path"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

   
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
            tab:2,  
            logName: '',
            logLink: '',
            drawer: null,
            items: [
                { id: 1, title: 'Home', path: '/home' },
                {id: 2, title: 'Shop', path: '/shop' },
                {id: 3, title: 'About', path: '/about' },
                { id: 4,title: 'Contact', path: '/contact' },
            ],
        }
    },
    mounted(){
      if(localStorage.getItem('token'))
      {
          this.logName = "Logout";
          this.logLink = "logout";
          if(localStorage.getItem('email') == "admin")
          {
            this.dashName = "Dashboard";
            this.dashLink = "item";
          }
          else
          {
            this.dashName = "Profile";
            this.dashLink = "profile";
          }
      }
      else
      {
          this.logName = "Login";
          this.logLink = "login";
          this.dashName = "Profile";
          this.dashLink = "profile";
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