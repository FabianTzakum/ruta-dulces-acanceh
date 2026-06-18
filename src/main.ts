import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'maplibre-gl/dist/maplibre-gl.css'
import 'driver.js/dist/driver.css'

import App from './App.vue'
import { router } from './app/router/index'

import './assets/styles/tokens.css'
import './assets/styles/base.css'
import './assets/styles/animations.css'
import './assets/styles/map.css'
import './assets/styles/cloudflare-map.css'
import './assets/styles/event-sheet.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
