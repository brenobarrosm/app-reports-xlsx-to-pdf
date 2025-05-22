<template>
  <v-row align-content="center" justify="center" no-gutters>
    <v-col cols="auto">
      <v-row justify="center" class="mb-n10">
        <v-col cols="auto">
          <v-icon
              icon="mdi-file-chart-outline"
              size="130"
              color="#1B2A41"
          ></v-icon>
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-n10">
        <v-col cols="auto">
          <h1 class="text-xl-h3 font-weight-regular">Gere um novo relatório</h1>
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-2">
        <v-col cols="auto">
          <p class="text-xl-h6 font-weight-light">Escolha um método para começar</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
              text="USAR ARQUIVO DO ONEDRIVE"
              @click="getFileFromOneDrive"
              color="#1B2A41"
              height="80"
              width="500"
              :loading="loading"
              rounded
              class="text-lg-h5 text-uppercase font-weight-regular hover-float-btn"
          >
            <template #prepend>
              <v-icon size="36" class="mr-2 cloud-icon">mdi-cloud</v-icon>
            </template>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-n4 mb-n6">
        <v-col cols="auto">
          <p v-if="!loading">ou</p>
          <p v-else>Aguarde enquanto o arquivo do OneDrive é processado...</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
              v-show="!loading"
              text="IMPORTE DO COMPUTADOR"
              @click="showUploadFileDialog = true"
              prepend-icon="mdi-monitor"
              color="#1B2A41"
              height="60"
              width="400"
              variant="outlined"
              rounded
          ></v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <upload-file
      :show-dialog="showUploadFileDialog"
      @close="showUploadFileDialog = false"
      @upload-file="handleUploadFile"
  ></upload-file>
</template>
<script setup>
import {ref} from "vue";
import UploadFile from "@/views/pages/geracao/UploadFile.vue";
import files from '@/api/files'

const emit = defineEmits(['fileSelected'])
const loading = ref(false)
const showUploadFileDialog = ref(false);

function handleUploadFile(file) {
  showUploadFileDialog.value = false;
  emit('fileSelected', file);
}

async function getFileFromOneDrive() {
  loading.value = true
  const file = await files.getFIleFromOneDrive()
  emit('fileSelected', file)
  loading.value = false
}
</script>

<style>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0px);
  }
}

.hover-float-btn:hover .cloud-icon {
  animation: float 1.5s ease-in-out infinite;
}
</style>
