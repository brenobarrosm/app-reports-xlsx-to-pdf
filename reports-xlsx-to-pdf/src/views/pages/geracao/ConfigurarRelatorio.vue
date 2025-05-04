<template>
<v-row justify="center" align-content="center" class="pa-16">
  <v-col cols="auto">
    <v-row>
      <v-col cols="auto">
        <v-select
            label="Tipo de relatório"
            width="300"
            :items="filterTypes"
            v-model="filterSelected.type"
            no-data-text="Nenhum item disponível"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-select
            v-if="filterSelected.type === 'REGIONAL'"
            :disabled="filterSelected.type === null"
            label="Selecione o escopo"
            width="300"
            :items="filterScopes"
            v-model="filterSelected.scope"
            no-data-text="Nenhum item disponível"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-text-field
            :label="filterSelected.type === 'PROFISSIONAL' ? 'Digite o CPF' : 'Digite o valor'"
            width="300"
            v-model="filterSelected.value"
            v-if="filterSelected.type === 'PROFISSIONAL' || filterSelected.scope !== null"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn
            text="Gerar relatório"
            color="#1B2A41"
            @click="$emit('createReport', filterSelected)"
        ></v-btn>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script setup>
import {ref} from "vue";

defineEmits(['createReport'])

const step = ref(1)
const filterTypes = ['REGIONAL', 'PROFISSIONAL']
const filterScopes = ['REGIÃO', 'UF', 'MUNICIPIO']

const filterSelected = ref({
  type: null,
  scope: 'ESPECÍFICO',
  value: null
})
</script>
