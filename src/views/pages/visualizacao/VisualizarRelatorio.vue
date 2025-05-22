<template>
  <v-row justify="center" align="center" class="fill-height pa-8">
    <v-col cols="12" md="8" lg="6">
      <v-card elevation="12" class="pa-12" style="border-radius: 20px; background: white;">
        <v-row justify="center" class="mb-8">
          <v-icon size="96" color="#1B2A41" class="mb-4" aria-hidden="true">mdi-chart-timeline-variant-shimmer</v-icon>
          <h1 class="font-weight-bold text-center" style="color: #1B2A41; font-size: 3.2rem; line-height: 1.1;">
            Seu relatório está pronto!
          </h1>
          <p class="subtitle-1 mt-2 font-weight-light" style="color: #566374; font-size: 1.25rem; max-width: 480px; text-align: center;">
            Você pode visualizar o relatório em PDF, ou gerar um novo relatório com outros filtros.
          </p>
        </v-row>

        <v-row justify="center" class="mb-6">
          <v-col cols="12" sm="8" md="6" class="d-flex justify-center">
            <v-btn
                @click="viewPdf"
                color="#1B2A41"
                class="px-12 py-6 mb-n8 font-weight-semibold"
                elevation="6"
                rounded
                style="font-size: 1.4rem;"
                prepend-icon="mdi-file-pdf-box"
                height="70"
                block
                :ripple="true"
            >
              Abrir PDF
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
                @click="$emit('newReport')"
                variant="text"
                color="#1B2A41"
                class="font-weight-medium"
                style="font-size: 1.1rem;"
                prepend-icon="mdi-restore"
                ripple
            >
              Gerar novo
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
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

<style scoped>
.v-btn:hover {
  filter: brightness(1.1);
  transition: filter 0.2s ease-in-out;
}
h1 {
  user-select: none;
}
</style>
