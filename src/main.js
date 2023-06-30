import { createApp } from 'vue'
import App from './App.vue'
//import LoginRegisterModal from './components/LoginSignup/LoginRegisterModal.vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import './assets/main.css'

createApp(App)
    .use(bootstrap)
    .mount('#app');