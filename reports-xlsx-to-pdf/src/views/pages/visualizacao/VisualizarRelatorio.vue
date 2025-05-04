<template>
  <v-row justify="center" align-content="center">
    <v-col cols="auto">
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <h2>Seu relatório está pronto!</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
              @click="viewPdf"
              text="Abrir PDF"
              color="#1B2A41"
              prepend-icon="mdi-file-pdf-box"
              width="250"
              height="60"
          ></v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-n2">
        <v-col cols="auto">
          <v-btn
              @click="$emit('newReport')"
              prepend-icon="mdi-restore"
              variant="text">Gerar novo</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps(['fileUrl'])
defineEmits(['newReport'])

function viewPdf() {
  window.open(props.fileUrl)
}
</script>
