<template>
  <v-container fluid class="pa-4 d-flex justify-end">
    <v-btn
        variant="text"
        append-icon="mdi-logout"
        color="error"
        class="mb-n12"
        @click="logout"
    >
      Sair
    </v-btn>
  </v-container>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <v-container v-if="pdfFileUrl == null && !loadingReport">
        <novo-relatorio
            v-if="fileSelected == null"
            @file-selected="handleFileSelect"
        />
        <configurar-relatorio-window
            v-else
            @cancel="fileSelected = null"
            @create-report="createReport"
        />
      </v-container>
      <v-container v-else>
        <gerando-relatorio v-if="loadingReport" />
        <visualizar-relatorio
            v-else
            @new-report="pdfFileUrl = null"
            :file-url="pdfFileUrl"
        />
      </v-container>
      <v-snackbar
          v-model="showSnackbar"
          :timeout="5000"
          color="error"
          class="mb-8"
          top
      >
        Ocorreu um erro durante a geração. Por favor, tente novamente!
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script setup>
import {ref} from "vue";
import NovoRelatorio from "@/views/pages/geracao/NovoRelatorio.vue";
import reports from "@/api/reports";
import GerandoRelatorio from "@/views/pages/visualizacao/ProcessandoRelatorio.vue";
import VisualizarRelatorio from "@/views/pages/visualizacao/VisualizarRelatorio.vue";
import ConfigurarRelatorioWindow from "@/views/pages/geracao/ConfigurarRelatorioWindow.vue";
import router from "@/router";

const loadingReport = ref(false)
const fileSelected = ref(null)
const pdfFileUrl = ref(null)
const showSnackbar = ref(false)

async function handleFileSelect(file) {
  fileSelected.value = file
}

async function createReport(filters) {
  loadingReport.value = true
  const reportInfo = await reports.getReportInfo(fileSelected.value, filters)
  if (reportInfo == null) {
    showSnackbar.value = true
    loadingReport.value = false
    return
  }
  const reportPdfBlob = await reports.getReportPdf(reportInfo)
  pdfFileUrl.value = URL.createObjectURL(new Blob([reportPdfBlob], { type: 'application/pdf' }))
  loadingReport.value = false
}

function logout() {
  sessionStorage.removeItem('token')
  router.push('/login')
}
</script>
