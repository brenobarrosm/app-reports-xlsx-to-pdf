<template>
  <v-card elevation="12" class="px-12 py-4" style="border-radius: 20px; background: white;">
    <v-row class="mb-2">
      <v-col cols="auto">
        <h1 style="color: #1B2A41">Gerar novo relatório</h1>
      </v-col>
    </v-row>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-row justify="space-between" class="mb-4">
          <v-col cols="auto">
            <report-type-card
                icon="mdi-map-marker"
                title="Regional"
                description="Gere um relatório completo apenas selecionando um município específico."
                @type-selected="selectFilterType('REGIONAL')"
            ></report-type-card>
          </v-col>
          <v-col cols="auto">
            <report-type-card
                icon="mdi-account-tie"
                title="Profissional"
                description="Gere um relatório de um profissional informando seu CPF."
                @type-selected="selectFilterType('PROFISSIONAL')"
            ></report-type-card>
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item :value="2">
        <v-container v-if="filterSelected.type === 'REGIONAL'">
          <v-row class="mb-n6">
            <v-col cols="auto">
              <label>Selecione o estado:</label>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-select
                  color="#324A5F"
                  variant="outlined"
                  base-color="#324A5F"
                  prepend-inner-icon="mdi-map-marker"
                  icon-color="#324A5F"
                  width="400"
                  v-model="estado"
                  :items="stateOptions"
                  item-title="name"
                  item-value="code"
                  placeholder="Estado"
                  return-object
                  persistent-hint
              />
            </v-col>
          </v-row>
          <v-row class="mb-n6 mt-n6">
            <v-col cols="auto">
              <label>Selecione o município:</label>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-combobox
                  prepend-inner-icon="mdi-home-city"
                  base-color="#324A5F"
                  icon-color="#324A5F"
                  color="#324A5F"
                  variant="outlined"
                  width="400"
                  v-model="municipio"
                  :items="filteredCities"
                  item-title="name"
                  item-value="id"
                  placeholder="Município"
                  :disabled="!estado"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-if="filterSelected.type === 'PROFISSIONAL'">
          <v-row>
            <v-col cols="auto">
              <label>Informe o CPF (apenas dígitos):</label>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-text-field
                  color="#324A5F"
                  prepend-inner-icon="mdi-account-search"
                  icon-color="#324A5F"
                  width="400"
                  v-model="cpf"
                  placeholder="CPF"
                  counter
                  maxlength="11"
                  variant="outlined"
                  base-color="#324A5F"
                  @input="onCpfInput"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
          v-if="step === 1"
          variant="text"
          @click="$emit('cancel')"
      >
        Cancelar
      </v-btn>
      <v-btn
          v-if="step > 1"
          variant="text"
          @click="backToFilterType"
      >
        Voltar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          :disabled="createReportButtonDisabled"
          v-if="step === 2"
          color="#1B2A41"
          variant="flat"
          height="45"
          class="px-6 py-4"
          @click="createReport"
          rounded
      >
        Gerar relatório
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {ref, computed, watch} from 'vue'
import brasil from '@/assets/brasil.json'
import ReportTypeCard from "@/views/components/ReportTypeCard.vue";

const emit = defineEmits(['cancel', 'createReport'])

const cpf = ref('')
const estado = ref(null)
const municipio = ref(null)
const step = ref(1)

const states = brasil.states
const cities = brasil.cities

watch(estado, (newEstado) => {
  if (newEstado !== estado) {
    municipio.value = null
  }
})

const stateOptions = Object.entries(states)
    .map(([id, name]) => ({ id: Number(id), name }))
    .sort((a, b) => a.name.localeCompare(b.name));
const filteredCities = computed(() => {
  if (!estado.value) return []
  return cities.filter(city => city.state_id === estado.value.id)
})

const createReportButtonDisabled = computed(() => {
  if (filterSelected.value.type === "REGIONAL") {
    return estado.value == null || municipio.value == null
  } else {
    return cpf.value.length < 11
  }
})

const filterSelected = ref({
  type: null,
  value: null
})

function selectFilterType(filterType) {
  filterSelected.value.type = filterType
  step.value = 2
}

function backToFilterType() {
  filterSelected.value.value = null
  filterSelected.value.type = null
  estado.value = null
  municipio.value = null
  step.value = 1
}

function onCpfInput() {
  cpf.value = cpf.value.replace(/\D/g, '').slice(0, 11)
}

function createReport() {
  if (filterSelected.value.type === 'REGIONAL') {
    filterSelected.value.value = `${estado.value.name}|${municipio.value.name}`
  } else {
    filterSelected.value.value = cpf.value
  }
  emit('createReport', filterSelected.value)
}

</script>
