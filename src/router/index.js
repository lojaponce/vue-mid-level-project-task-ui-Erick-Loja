import { createRouter, createWebHistory } from 'vue-router'
import ProjectList from '../views/ProjectList.vue'
import TaskList from '../views/TaskList.vue'
const routes = [
    {path: '/', redirect: '/projects'},
    {path: '/projects', component: ProjectList},
    {path: '/tasks', component: TaskList},
    {path: '/task/:projectId', component: TaskList, props: true},
]
const router =createRouter({
    history: createWebHistory(),
    routes,
})
export default router