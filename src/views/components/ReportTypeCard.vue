<template>
  <v-card
      color="#1B2A41"
      width="300"
      height="300"
      class="align-content-center rounded-lg elevation-10 card-hover"
      @click="$emit('typeSelected')"
      rounded
  >
    <v-row align="center" justify="center" class="mx-4">
      <v-col cols="auto">
        <v-row justify="center" class="mb-n10 mt-2">
          <v-col cols="auto">
            <div class="icon-container">
              <v-icon class="icon" size="90" color="white">{{ icon }}</v-icon>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <h1 class="text">{{ title.toUpperCase() }}</h1>
          </v-col>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <v-row justify="center" class="text-justify mb-4">
          <v-col cols="auto">
            <p class="font-weight-thin text-h6 text-center">{{ description }}</p>
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

<style scoped>
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.card-hover:hover .icon-container {
  transform: translateY(-8px);
}
</style>
