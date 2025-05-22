<template>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <v-row justify="center" class="mb-n6">
        <v-col cols="auto">
          <v-avatar color="#1B2A41" size="100">
            <v-icon size="60">mdi-login</v-icon>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-4">
        <v-col cols="auto">
          <h1 style="color: #1B2A41">Faça login para continuar</h1>
        </v-col>
      </v-row>
      <v-row justify="start" class="mb-n6">
        <v-col cols="auto">
          <label>Insira seu email:</label>
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-n8">
        <v-col cols="auto">
          <v-text-field
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="email"
              placeholder="Email"
              width="400"
              color="#1B2A41"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="start" class="mb-n6">
        <v-col cols="auto">
          <label>Insira sua senha:</label>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-text-field
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              v-model="password"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Senha"
              hide-details
              @click:append-inner="showPassword = !showPassword"
              width="400"
              color="#1B2A41"
              class="mb-4"
              @keydown.enter="handleLogin"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
              color="#1B2A41"
              width="400"
              rounded
              height="60"
              class="text-lg-h6"
              @click="handleLogin"
              :loading="loading"
          >
            ENTRAR
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UsersApiClient from '@/api/users.js'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await UsersApiClient.login({
      email: email.value,
      password: password.value
    })
    const token = response.access_token
    sessionStorage.setItem('token', token)
    await router.push('/')
  } catch (error) {
    alert('Email ou senha inválidos.')
    console.error(error)
  }
  loading.value = false
}
</script>
