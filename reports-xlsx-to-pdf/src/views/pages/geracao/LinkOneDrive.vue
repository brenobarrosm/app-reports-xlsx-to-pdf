<template>
  <v-dialog
      :model-value="showDialog"
      persistent
  >
    <v-row justify="center">
      <v-col cols="auto">
        <v-card width="600">
          <v-row justify="space-between" align="center" class="px-4 py-2">
            <v-col cols="auto">
              <h2>Arquivo do OneDrive</h2>
            </v-col>
            <v-col cols="auto">
              <v-icon @click="$emit('close')">mdi-close</v-icon>
            </v-col>
          </v-row>
          <v-row class="ml-4 mb-n8">
            <v-col cols="auto">
              <p>Link compartilhavel do arquivo:</p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-text-field
                  label="Cole o link aqui"
                  width="550"
                  v-model="fileUrl"
                  :disabled="!editUrl"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="ml-2 mt-n10 mb-n8">
            <v-col cols="auto">
              <v-checkbox
                  label="Editar"
                  v-model="editUrl"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row justify="end" class="px-4 py-2">
            <v-col cols="auto">
              <v-btn
                  color="#1B2A41"
                  @click="confirm"
                  :loading="loading"
                  :disabled="fileUrl == null || fileUrl === ``"
              >Confirmar</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import files from "@/api/files";

const props = defineProps(['showDialog']);
const emit = defineEmits(['close', 'uploadFile'])

const loading = ref(false)
const editUrl = ref(false)
const fileUrl = ref(null)
const file = ref(null)

async function confirm() {
  loading.value = true
  localStorage.setItem('onedrive-file-url', fileUrl.value)
  file.value = await files.getFIleFromOneDrive(fileUrl.value)
  emit('uploadFile', file.value)
  loading.value = false
}

onBeforeMount(() => {
  const storedUrl = localStorage.getItem('onedrive-file-url')
  if (storedUrl) {
    fileUrl.value = storedUrl
  }
})
</script>
