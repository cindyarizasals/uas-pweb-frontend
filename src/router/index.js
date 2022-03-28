import {createRouter, createWebHistory} from "vue-router";
import IndexView from '../views/IndexView.vue';
import AboutView from "../views/AboutView.vue";

const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router