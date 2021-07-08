import Vue from 'vue';
import VueRouter from 'vue-router';
import InventoryList from '../pages/inventory/InventoryList.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'overview',
    },
    {
        path: '/inventory',
        name: 'inventory',
        component: InventoryList
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;