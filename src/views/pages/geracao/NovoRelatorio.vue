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
              @click="showOneDriveDialog = true"
              color="#1B2A41"
              height="80"
              width="500"
              rounded
              class="text-lg-h5 text-uppercase font-weight-regular"
          >
            <template #prepend>
              <v-icon size="36" class="mr-2">mdi-cloud</v-icon>
            </template>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-n4 mb-n6">
        <v-col cols="auto">
          <p>ou</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
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
  <link-one-drive
      :show-dialog="showOneDriveDialog"
      @close="showOneDriveDialog = false"
      @upload-file="handleUploadFile"
  ></link-one-drive>
  <upload-file
      :show-dialog="showUploadFileDialog"
      @close="showUploadFileDialog = false"
      @upload-file="handleUploadFile"
  ></upload-file>
</template>
<script setup>
import {ref} from "vue";
import UploadFile from "@/views/pages/geracao/UploadFile.vue";
import LinkOneDrive from "@/views/pages/geracao/LinkOneDrive.vue";

const emit = defineEmits(['fileSelected'])
const showOneDriveDialog = ref(false)
const showUploadFileDialog = ref(false);

function handleUploadFile(file) {
  showUploadFileDialog.value = false;
  showOneDriveDialog.value = false;
  emit('fileSelected', file);
}
</script>
