import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import Contact from "../views/Contact.vue";
import FilmListView from "../views/film/FilmListView.vue";
import KategoriListView from "../views/kategori/KategoriListView.vue";
import NegaraListView from "../views/negara/NegaraListView.vue";
import Error404View from "../views/error/Error404View.vue";

const DEFAULT_TITLE = "Kuliah Web 2022 by Pizaini";
const routes = [
  {
    path: "/",
    name: "index",
    component: IndexView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
    meta: {
      title: "Contact",
    },
  },
  {
    path: "/film",
    name: "film",
    component: FilmListView,
    meta: {
      title: "Film list",
    },
  },
  {
    path: "/kategori",
    name: "kategori",
    component: KategoriListView,
    meta: {
      title: "Kategori",
    },
  },
  {
    path: "/negara",
    name: "negara",
    component: NegaraListView,
    meta: {
      title: "Negara",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error404",
    component: Error404View,
    meta: {
      title: "Error 404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.afterEach((to, from, next) => {
  const metaTitle = to.meta.title;
  if (metaTitle) {
    document.title = metaTitle + " - " + DEFAULT_TITLE;
  } else {
    document.title = DEFAULT_TITLE;
  }
});

export default router;
