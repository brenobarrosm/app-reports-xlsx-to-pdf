<template>
  <v-row justify="end" class="py-6 px-12">
    <v-col cols="auto">
      <v-btn
          :text="isTokenPresent ? 'Conta Microsoft vinculada' : 'Entrar com conta Microsoft'"
          :disabled="isTokenPresent"
          :prepend-icon="isTokenPresent && 'mdi-account'"
          @click="login"
      ></v-btn>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="auto">
      <v-row justify="center">
        <v-col cols="auto">
          <h1>Gere um novo relatório</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
              text="Importar do Teams"
              prepend-icon="mdi-microsoft-teams"
              color="#1B2A41"
              disabled
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
  <upload-file
      :show-dialog="showUploadFileDialog"
      @close="showUploadFileDialog = false"
      @upload-file="handleUploadFile"
  ></upload-file>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { msalInstance, loginRequest, initializeMsal } from "@/msalConfig";
import UploadFile from "@/views/pages/geracao/UploadFile.vue";

const emit = defineEmits(['fileSelected'])
const isTokenPresent = ref(false);
const showUploadFileDialog = ref(false);

onMounted(() => {
  const existingToken = localStorage.getItem("msal-token");
  isTokenPresent.value = !!existingToken;
});

function handleUploadFile(file) {
  showUploadFileDialog.value = false;
  emit('fileSelected', file);
}

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
