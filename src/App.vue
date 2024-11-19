<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Учёт работников</v-toolbar-title>
      <v-spacer />
      <v-btn
        to="/doctors"
        text
      >
        Врачи
      </v-btn>
      <v-btn
        to="/nurses"
        text
      >
        Медсестры
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style></style>
