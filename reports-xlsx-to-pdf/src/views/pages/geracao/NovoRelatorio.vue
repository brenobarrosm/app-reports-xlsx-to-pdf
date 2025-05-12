<template>
  <v-row justify="center" align-content="center">
    <v-col cols="auto">
      <v-row justify="center">
        <v-col cols="auto">
          <h1>Gere um novo relatório</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
              text="Importar do OneDrive"
              @click="showOneDriveDialog = true"
              prepend-icon="mdi-microsoft-onedrive"
              color="#1B2A41"
              height="60"
              width="300"
          ></v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
              text="Importar do computador"
              @click="showUploadFileDialog = true"
              prepend-icon="mdi-monitor"
              color="#1B2A41"
              height="60"
              width="300"
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
import { ref } from "vue";
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
