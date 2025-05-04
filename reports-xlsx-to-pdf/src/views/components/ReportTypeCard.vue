<template>
  <v-card
      color="#324A5F"
      width="250"
      height="250"
      @click="$emit('typeSelected')">
    <v-row align-content="center" justify="center">
      <v-col cols="auto" align-self="center">
        <v-card-title class="text-center">
          <v-icon class="align-center text-center" size="70">{{icon}}</v-icon>
        </v-card-title>
        <v-card-title class="text-center">{{title}}</v-card-title>
        <v-card-text class="text-justify">{{description}}</v-card-text>
      </v-col>
    </v-row>

  </v-card>
</template>

<script setup>
defineEmits(['typeSelected'])
defineProps(['icon', 'title', 'description'])
</script>