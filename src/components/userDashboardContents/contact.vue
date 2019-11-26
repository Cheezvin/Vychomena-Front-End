<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <h1 class="display-3 text-center mt-5 mb-5">CONTACT US</h1>
      <v-card ref="form">
        <v-card-text>
          <v-text-field ref="name" v-model="name" :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages" label="Name" placeholder="Name"></v-text-field>
          <v-text-field ref="email" v-model="email" :rules="[() => !!email || 'This field is required']" label="Email"
            placeholder="Email"></v-text-field>
          <v-text-field ref="number" v-model="number" :rules="[() => !!number || 'This field is required']"
            label="Phone Number" placeholder="Phone Number"></v-text-field>
          <v-textarea ref="address" v-model="address" :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 999,
            ]" label="Message" placeholder="Message" counter="999">
          </v-textarea>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row align="center">
            <div class="my-2">
              <v-btn color="success" dark large>Send</v-btn>
            </div>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>