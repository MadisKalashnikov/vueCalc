import './assets/main.css'
import 'vue-toastification/dist/index.css';
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from "vue-toastification";
const app = createApp(App)

app.use(router)
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 2000,
  maxToasts: 3,
})
app.mount('#app')
