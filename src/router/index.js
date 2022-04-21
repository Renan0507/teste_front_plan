import Vue from "vue";
import VueRouter from "vue-router";
import ListView from '../views/ListView.vue';
import EditView from '../views/EditView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/",
    name: "lista",
    component: ListView
  },
  {
    path: "/editar/:id",
    name: "editar",
    component: EditView
  },
];

const router = new VueRouter({
  routes,
});

export default router;
