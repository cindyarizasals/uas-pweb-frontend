import {createRouter, createWebHistory} from "vue-router";
import IndexView from '../views/IndexView.vue';
import AboutView from "../views/AboutView.vue";
import QuranView from "../views/QuranView.vue";
import AnnasView from "../views/AnnasView.vue";
import AritmatikaGet from "../views/aritmatika/AritmatikaGet.vue";
import AritmatikaPost from "../views/aritmatika/AritmatikaPost.vue";
import BukuDetailView from "../views/buku/BukuDetailView.vue";
import BukuListView from "../views/buku/BukuListView.vue";
import KategoriListView from "../views/kategori/KategoriListView.vue";

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
    },
    {
        path: '/annas',
        name: 'annas',
        component: AnnasView,
        meta: {
            title: 'Surah Annas'
        }
    },
    {
        path: '/aritmatika-get',
        name: 'aritmatika-get',
        component: AritmatikaGet,
        meta: {
            title: 'Aritmatika Get'
        }
    },
    {
        path: '/aritmatika-post',
        name: 'aritmatika-post',
        component: AritmatikaPost,
        meta: {
            title: 'Aritmatika Post'
        }
    },
    {
        path: '/buku',
        name: 'buku',
        component: BukuListView,
        meta: {
            title: 'Buku list'
        }
    },
    {
        path: '/buku-detail',
        name: 'buku-detail',
        component: BukuDetailView,
        meta: {
            title: 'Buku detail'
        }
    },
    {
        path: '/kategori',
        name: 'kategori',
        component: KategoriListView,
        meta: {
            title: 'Kategori'
        }
    },
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