<template>
  <v-card
      color="#324A5F"
      width="250"
      height="250"
      @click="$emit('typeSelected')">
    <v-row align="center" justify="center" class="mx-4">
      <v-col cols="auto">
        <v-row justify="center" class="mt-4 mb-n8">
          <v-col cols="auto">
            <v-avatar color="white" size="65">
              <v-icon class="align-center text-center" size="50" color="#0C1821">{{ icon }}</v-icon>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <h2>{{ title }}</h2>
          </v-col>
        </v-row>
        <v-row justify="center" class="text-justify mb-4">
          <v-col cols="auto">
            <p>{{ description }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </v-card>
</template>

<script setup>
defineEmits(['typeSelected'])
defineProps(['icon', 'title', 'description'])
</script>