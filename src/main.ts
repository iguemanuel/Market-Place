import './assets/main.css'
import 'vue-toastification/dist/index.css'

import Toast from 'vue-toastification'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast)

pinia.use(piniaPersist)

app.mount('#app')
