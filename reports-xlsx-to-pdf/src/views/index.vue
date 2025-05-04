<template>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <v-container v-if="pdfFileUrl == null && !loadingReport">
        <novo-relatorio
            v-if="fileSelected == null"
            @file-selected="handleFileSelect"
        ></novo-relatorio>
        <configurar-relatorio-window
            v-else
            @cancel="fileSelected = null"
            @create-report="createReport"
        ></configurar-relatorio-window>
      </v-container>
      <v-container v-else justify="center">
        <gerando-relatorio
            v-if="loadingReport"
        ></gerando-relatorio>
        <visualizar-relatorio
            v-else
            @new-report="fileSelected = null; pdfFileUrl = null"
            :file-url="pdfFileUrl"
        ></visualizar-relatorio>
      </v-container>
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

const loadingReport = ref(false)
const fileSelected = ref(null)
const pdfFileUrl = ref(null)

async function handleFileSelect(file) {
  fileSelected.value = file
}

async function createReport(filters) {
  loadingReport.value = true
  const reportInfo = await reports.getReportInfo(fileSelected.value, filters)
  const reportPdfBlob = await reports.getReportPdf(reportInfo)
  pdfFileUrl.value = URL.createObjectURL(new Blob([reportPdfBlob], { type: 'application/pdf' }))
  loadingReport.value = false
}
</script>
