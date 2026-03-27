import { createRouter, createWebHistory } from "vue-router"
import Home       from "../views/Home.vue"
import About      from "../views/About.vue"
import Projects   from "../views/Projects.vue"
import Contact    from "../views/Contact.vue"
import Services   from "../views/Services.vue"
import Experience from "../views/Experience.vue"
import NotFound   from "../views/404.vue"

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/",           component: Home       },
    { path: "/about",      component: About      },
    { path: "/projects",   component: Projects   },
    { path: "/contact",    component: Contact    },
    { path: "/services",   component: Services   },
    { path: "/experience", component: Experience },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
})