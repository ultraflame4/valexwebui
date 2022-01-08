import { createApp } from 'vue'
import App from './App.vue'
import "./assets/reset.sass"
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Dashboard from "./views/Dashboard/Dashboard.vue";
import Containers from "./views/Containers/Containers.vue";

const router= createRouter({
    history: createWebHistory(),
    routes:[
        {path:"/",name:"Home",redirect:"dashboard"},
        {path:"/dashboard",name:"dashboard",component:Dashboard},
        {path:"/containers",name:"containers",component:Containers},
    ]
})

createApp(App)
    .use(router)
    .mount('#app');
