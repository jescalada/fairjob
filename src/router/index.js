import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobResultsView from "@/views/JobResultsView.vue";
import JobView from "@/views/JobView.vue";
import ServicesView from "@/views/ServicesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/",
    name: "JobResults",
    component: JobResultsView,
  },
  {
    path: "/jobs/:id",
    name: "JobListing",
    component: JobView,
  },
  {
    path: "/services/",
    name: "ServicesView",
    component: ServicesView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default router;
