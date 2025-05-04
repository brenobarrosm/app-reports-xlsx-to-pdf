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
              <h2>Importar planilha</h2>
            </v-col>
            <v-col cols="auto">
              <v-icon @click="$emit('close')">mdi-close</v-icon>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-file-input
                  icon-color="#1B2A41"
                  prepend-icon="mdi-file-excel"
                  accept=".xlsx"
                  label="Selecione o arquivo..."
                  v-model="file"
                  variant="solo"
                  width="550"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row justify="end" class="px-4 py-2">
            <v-col cols="auto">
              <v-btn color="#1B2A41" @click="$emit('uploadFile', file)">Confirmar</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps(['showDialog']);
const emit = defineEmits(['close', 'uploadFile'])

const file = ref(null)

</script>
