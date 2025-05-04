<template>
  <v-card
      class="px-4"
  >
    <v-row class="mb-2">
      <v-col cols="auto">
        <h2>Gerar novo relatório</h2>
      </v-col>
    </v-row>


    <v-window v-model="step">
      <v-window-item :value="1">
        <v-row justify="space-between" class="mb-4">
          <v-col cols="auto">
            <report-type-card
                icon="mdi-map-marker"
                title="Regional"
                description="Gere um relatório a partir de uma região, estado ou município desejado.."
                @type-selected="selectFilterType('REGIONAL')"
            ></report-type-card>
          </v-col>
          <v-col cols="auto">
            <report-type-card
                icon="mdi-account-tie"
                title="Profissional"
                description="Gere um relatório de um profissional da base de dados apenas informando seu CPF."
                @type-selected="selectFilterType('PROFISSIONAL')"
            ></report-type-card>
          </v-col>
        </v-row>
      </v-window-item>


      <v-window-item :value="2">
        <v-container v-if="filterSelected.type === 'REGIONAL'">
          <v-row>
            <v-col cols="auto">
              <label>Selecione o escopo:</label>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">


              <v-btn-toggle
                  v-model="filterSelected.scope"
                  color="#324A5F"
                  border
                  divided
                  rounded="0"
                  variant="elevated"
                  group
                  density="comfortable"
              >
                <v-btn value="REGIÃO" width="133">
                  Regional
                </v-btn>

                <v-btn value="UF" width="133">
                  Estadual
                </v-btn>

                <v-btn value="MUNICÍPIO" width="133">
                  Municipal
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-container>
        <v-row v-if="filterSelected.type === 'PROFISSIONAL'">
          <v-col cols="auto">
            <label>Digite o CPF:</label>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-text-field
                :disabled="filterSelected.type === 'REGIONAL' && filterSelected.scope == null"
                v-model="filterSelected.value"
                label="Digite aqui..."
                variant="filled"
                width="400"
            ></v-text-field>
          </v-col>
        </v-row>
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
          :disabled="createButtonDisabled"
          v-if="step === 2"
          color="#1B2A41"
          variant="flat"
          @click="$emit('createReport', filterSelected)"
      >
        Gerar relatório
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {computed, ref} from "vue";
import ReportTypeCard from "@/views/components/ReportTypeCard.vue";

defineEmits(['cancel', 'createReport'])

const step = ref(1)
const createButtonDisabled = computed(() => {
  return filterSelected.value.type == null
      || filterSelected.value.scope == null
      || filterSelected.value.value == null
      || filterSelected.value.value === ''
})

const filterSelected = ref({
  type: null,
  scope: null,
  value: null
})

function selectFilterType(filterType) {
  filterSelected.value.type = filterType
  if (filterType === 'PROFISSIONAL') {
    filterSelected.value.scope = 'PROFISSIONAL'
  }
  step.value = 2
}

function backToFilterType() {
  filterSelected.value.value = null
  filterSelected.value.scope = null
  filterSelected.value.type = null
  step.value = 1
}
</script>
