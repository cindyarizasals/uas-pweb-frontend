import {createRouter, createWebHistory} from "vue-router";
import IndexView from '../views/IndexView.vue';
import AboutView from "../views/AboutView.vue";
import QuranView from "../views/QuranView.vue";

const DEFAULT_TITLE = 'Kuliah Web 2022 by Pizaini';
const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexView,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        meta: {
            title: 'About'
        }
    },
    {
        path: '/quran',
        name: 'quran',
        component: QuranView,
        meta: {
            title: 'Qur\'an'
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.afterEach((to, from, next) => {
    const metaTitle = to.meta.title;
    if(metaTitle){
        document.title = metaTitle+" - "+DEFAULT_TITLE;
    }else{
        document.title = DEFAULT_TITLE;
    }
})


export default router