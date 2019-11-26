<template>
  <v-container>
    <v-img :src="require('../../assets/home1.png')">
    <h1 class="display-3 text-right mt-12 mr-12" style="color: white">Beli aja disini !</h1>
    </v-img>
    <v-layout v-for="(item,i) in category" :key="i" class="d-inline-flex mt-4">
      <v-card
          :to="item.path"
          max-width="344"
          class="mx-auto ml-7"
          elevation="20"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline text-center">{{item.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-img
            
            :src="item.img"
            height="300"
          ></v-img>

        </v-card>
    </v-layout>
    <v-footer
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vychomena</strong>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: 'Index',

  data: () => ({
      category:[
        {
          text: 'Men',
          img: require('../../assets/men.jpg'),
          path: '/shop'
        },
        {
          text: 'Woman',
          img: require('../../assets/women.jpg'),
          path: '/shop'
        },
        {
          text: 'Children',
         img: require('../../assets/children.jpg'),
         path: '/shop'
        },
      ]
  }),
};
</script>
