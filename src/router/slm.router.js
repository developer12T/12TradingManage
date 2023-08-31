export default {
    path: '/saleManage',
    component: () => import('../views/salemanage/layout.vue'),
    redirect: '/saleManage/orderCN',
    children: [
        { path: '/saleManage/orderCN', component: () => import('../views/salemanage/orderCashCN.vue') },
    ]
};