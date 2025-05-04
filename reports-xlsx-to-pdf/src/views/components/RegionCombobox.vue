<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-combobox
            v-model="estadoSelecionado.value"
            :items="listaEstados"
            label="Selecione o estado"
            item-text="nome"
            item-value="id"
            dense
            outlined
        ></v-combobox>
      </v-col>

      <v-col cols="12" sm="6">
        <v-combobox
            v-model="cidadeSelecionada.value"
            :items="cidadesFiltradas"
            label="Selecione a cidade"
            item-text="name"
            item-value="id"
            :disabled="!estadoSelecionado.value"
            dense
            outlined
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import brasil from '@/assets/brasil.json'

const estados = brasil.states
const cidades = brasil.cities

const estadoSelecionado = ref(null)
const cidadeSelecionada = ref(null)

const listaEstados = computed(() => {
  return Object.entries(estados).map(([id, nome]) => ({
    id: Number(id),
    nome
  }))
})

const cidadesFiltradas = computed(() => {
  if (!estadoSelecionado.value) return []
  return cidades.filter(cidade => cidade.state_id === estadoSelecionado.value)
})
</script>
