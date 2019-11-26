<template>
  <div class="ma-5 pa-5">
    <v-container class="grey lighten-5">
      <v-row>
        <v-col md="7">
          <v-card class="pa-2" outlined tile>
            <v-img src="../../assets/about.jpg" width="800" height="400">
            </v-img>
          </v-card>
        </v-col>
        <v-col md="4" class="ml-auto">
          <h1 class="display-3 font-weight-bold text-left mt-4 mr-4">About Us </h1>
          <p class="text-md-left">Vychomena merupakan singkatan Arvydo, Nicholas, Melvin, dan Natte.</p>
        </v-col>
      </v-row>
      <v-progress-linear indeterminate color="black darken-2"></v-progress-linear>
      <h1 class="display-3 text-center mt-12 mr-12">The Team </h1>
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col>
            <v-card class="pa-2 text-center font-weight-bold">
              <v-img src="../../assets/Nicho.jpg" width="265" height="250"></v-img>
              Nicholas Kevin / 170709142
            </v-card>
          </v-col>
          <v-col order="12">
            <v-card class="pa-2 text-center font-weight-bold">
              <v-img src="../../assets/Natte.jpg" width="265" height="250"></v-img>
              Natte V. Omang / 170709248
            </v-card>
          </v-col>
          <v-col order="1">
            <v-card class="pa-2 text-center font-weight-bold">
              <v-img src="../../assets/Arvydo.jpg" width="265" height="250"></v-img>
              Arvydo / 170709181
            </v-card>
          </v-col>
          <v-col order="1">
            <v-card class="pa-2 text-center font-weight-bold">
              <v-img src="../../assets/Melvin.jpg" width="265" height="250"></v-img>
              Melvin Simahan / 170709193
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>