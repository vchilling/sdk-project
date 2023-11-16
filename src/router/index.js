import { createRouter, createWebHistory } from 'vue-router';
import UserActions from '../components/UserActions';
import UserData from '../components/UserData.vue';
import UserAuthorization from '../components/UserAuthorization.vue';

const routes = [
  { path: '/', component: UserActions },
  { path: '/user-authorization', component: UserAuthorization },
  { path: '/user-data', component: UserData },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
