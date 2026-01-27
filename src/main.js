import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Home from "./views/Home.vue"
import About from "./views/About.vue"
import Projects from "./views/Projects.vue"
import Contact from "./views/Contact.vue"


createApp(App).use(router).mount('#app')
