<template>

  <v-row justify="center" align="center" class="mb-n9">
    <v-col cols="auto">
      <label class="text-lg-h6 font-weight-thin" style="color: #1B2A41">Aguarde um momento...</label>
    </v-col>
  </v-row>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <label class="text-lg-h5 font-weight-light" style="color: #1B2A41">Seu relatório estará pronto em breve!</label>
    </v-col>
  </v-row>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <v-progress-circular size="80" width="8" color="#1B2A41" indeterminate></v-progress-circular>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
</script>