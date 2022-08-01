import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import SelectComp from "./components/SelectComponent.vue"

const app = createApp(App)

app.component("select-with-search", SelectComp);

app.mount('#app')

