<template>
  <v-container
      class="pa-4 d-flex justify-end"
      style="position: absolute; top: 0; left: 0; right: 0; z-index: 10;"
  >
    <v-row>
      <v-col cols="auto">
        <v-btn
            :text="isTokenPresent ? 'Conta Microsoft vinculada' : 'Entrar com conta Microsoft'"
            :disabled="isTokenPresent"
            :prepend-icon="isTokenPresent && 'mdi-account'"
            @click="login"
        ></v-btn>
      </v-col>
    </v-row>

  </v-container>
  <v-row align-content="center" justify="center" class="mt-16">
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
import {onMounted, ref} from "vue";
import UploadFile from "@/views/pages/geracao/UploadFile.vue";
import LinkOneDrive from "@/views/pages/geracao/LinkOneDrive.vue";
import { msalInstance, loginRequest, initializeMsal } from "@/msalConfig";

const emit = defineEmits(['fileSelected'])
const showOneDriveDialog = ref(false)
const showUploadFileDialog = ref(false);
const isTokenPresent = ref(false);


function handleUploadFile(file) {
  showUploadFileDialog.value = false;
  showOneDriveDialog.value = false;
  emit('fileSelected', file);
}

onMounted(() => {
  const existingToken = localStorage.getItem("msal-token");
  isTokenPresent.value = !!existingToken;
});

const login = async () => {
  try {
    await initializeMsal();

    const loginResponse = await msalInstance.loginPopup(loginRequest);
    const account = loginResponse.account;

    const tokenResponse = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });

    const accessToken = tokenResponse.accessToken;
    localStorage.setItem("msal-token", accessToken);
    isTokenPresent.value = true;
    console.log("Token de acesso:", accessToken);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
};
</script>
