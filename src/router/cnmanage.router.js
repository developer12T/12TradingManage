export default {
    path: '/saleManage',
    component: () => import('../views/cnmanage/layout.vue'),
    redirect: '/saleManage/orderCN',
    children: [
        { path: '/saleManage/orderCN', component: () => import('../views/cnmanage/orderCashCN.vue') },
        { path: '/saleManage/orderMonth', component: () => import('../views/cnmanage/orderCash.vue') },
    ]
};