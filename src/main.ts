import { createApp } from 'vue'
import App from './App.vue'
import "./assets/global.sass"
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Dashboard from "./views/Dashboard/Dashboard.vue";
import Containers from "./views/Containers/Containers.vue";
import {setRouter} from "./api";

export const router= createRouter({
    history: createWebHistory(),
    routes:[
        {path:"/",name:"Home",redirect:"dashboard"},
        {path:"/dashboard",name:"dashboard",component:Dashboard},
        {path:"/containers",name:"containers",component:Containers},
    ]
})

setRouter(router)


createApp(App)
    .use(router)
    .mount('#app');
