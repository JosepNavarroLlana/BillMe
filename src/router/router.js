import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/inicio.vue'
import Listado from '../views/Listado.vue'
import Movimiento from '../views/Movimiento.vue'
import Editar from '../views/Editar.vue'
import notFound from '../views/notFound.vue'

const routes = [
    { path: '/', component: HomePage},
    { path: '/listado', component: Listado},
    { path: '/movimiento', name:'Movimiento', component: Movimiento},
    { path: '/editar', component: Editar},
    { path: '/:pathMatch(.*)*', component: notFound}
]

const router = createRouter({
 history: createWebHistory(),
 routes
});

export default router;
