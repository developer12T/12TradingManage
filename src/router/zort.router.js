export default {
    path: '/zort',
    component: () => import('../views/zort/layout.vue'),
    children: [
        { path: '/order/all', component: () => import('../views/zort/orderZort.vue') },
        { path: '/order/inv', component: () => import('../views/zort/orderZort.vue') },
        { path: '/order/reciept', component: () => import('../views/zort/orderZort.vue') },
        { path: '/stock/zort', component: () => import('../views/zort/stockZort.vue') },
        { path: '/stock/erp', component: () => import('../views/zort/stockERP.vue') }
    ]
};