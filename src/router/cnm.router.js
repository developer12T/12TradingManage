export default {
    path: '/cnManage',
    component: () => import('../views/cnmanage/layout.vue'),
    redirect: '/cnManage/orderCN',
    children: [
        { path: '/cnManage/orderCN', component: () => import('../views/cnmanage/orderCashCN.vue') },
    ]
};