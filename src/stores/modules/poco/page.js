import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
    state: () => ({
        currentPage: localStorage.getItem('pocoPage') || 'dashboard',
    }),
    actions: {
        setPage(pageName) {
            this.currentPage = pageName;
            localStorage.setItem('pocoPage', pageName);
        },
    },
});