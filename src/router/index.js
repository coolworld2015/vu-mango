import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '@/components/common/login';
import Test2 from '@/components/common/test2';
import Test3 from '@/components/common/test3';
import Test4 from '@/components/common/test4';
import Test5 from '@/components/common/test5';

import PhoneEdit from '@/components/clients/edit';

import Users from '@/components/users/users';
import UserEdit from '@/components/users/edit';
import UserAdd from '@/components/users/add';

import Balance from '@/components/balance/balance';
import Inputs from '@/components/inputs/inputs';
import Outputs from '@/components/outputs/outputs';
import Clients from '@/components/clients/clients';
import ContactEdit from '@/components/clients/edit';

export default new Router({
  routes: [
    { path: '/', component: Login },
	{ path: '*', component: Login },
    { path: '/login', component: Login },
    { path: '/test2', component: Test2 },
    { path: '/test3', component: Test3 },
    { path: '/test4', component: Test4 },
    { path: '/test5', component: Test5 },

	  { path: '/phone-edit', component: PhoneEdit },
    { path: '/users', component: Users },

    { path: '/user-edit', component: UserEdit },
    { path: '/user-add', component: UserAdd },

    { path: '/balance', component: Balance },
    { path: '/inputs', component: Inputs },
    { path: '/outputs', component: Outputs },
    { path: '/clients', component: Clients },
    { path: '/contact-edit', component: ContactEdit },

  ]
})
