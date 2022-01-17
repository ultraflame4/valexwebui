import {createApp} from 'vue'
import App from './App.vue'
import "./assets/global.sass"
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Dashboard from "./views/Dashboard/Dashboard.vue";
import Containers from "./views/Containers/Containers.vue";
import * as api from "./api";
import LoginView from "./views/LoginView/LoginView.vue";
import {pushErrorMsg} from "./components/ErrorMessageSidebar/ErrorSidebar.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", name: "Home", redirect: "login"},
        {path: "/dashboard", name: "dashboard", component: Dashboard},
        {path: "/containers", name: "containers", component: Containers},
        {path: "/login", name: "login", component: LoginView},
    ],
})

router.beforeEach((to, from, next) => {
    if (!api.isLoggedIn() && to.name != "login" && !api.debugMode) {
        pushErrorMsg({
            title: "Authentication Precondition Failed",
            code: 412,
            message: "You have not logged in. Authentication with api is impossible"
        })
        next({name: "login"})
    } else {
        next()
    }
})

api.setRouter(router)


createApp(App)
    .use(router)
    .mount('#app');
