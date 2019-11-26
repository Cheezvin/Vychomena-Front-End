<template>
  <v-container>
    <v-img v-bind:src="'/assets/hero_1.jpg'">
    <h1 class="display-3 text-right mt-12 mr-12" >Beli aja disini !</h1>
    </v-img>
    <v-layout v-for="(item,i) in category" :key="i" class="d-inline-flex mt-4">
      <v-card
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

          <v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Read
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Bookmark
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Index',

  data: () => ({
      category:[
        {
          text: 'Men',
          //img: require=('src/assets/men.jpg')
        },
        {
          text: 'Woman',
        //  img: require('src/assets/women.jpg')
        },
        {
          text: 'Children',
       //  img: require('src/assets/children.jpg')
        },
      ]
  }),
};
</script>
