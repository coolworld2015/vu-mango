import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '@/components/common/login';

import Balance from '@/components/balance/balance';
import Inputs from '@/components/inputs/inputs';
import Outputs from '@/components/outputs/outputs';

import Contacts from '@/components/contacts/contacts';
import ContactEdit from '@/components/contacts/edit';
import ContactAdd from '@/components/contacts/add';

export default new Router({
  routes: [
    { path: '/', component: Login },
	  { path: '*', component: Login },
    { path: '/login', component: Login },

    { path: '/balance', component: Balance },
    { path: '/inputs', component: Inputs },
    { path: '/outputs', component: Outputs },

    { path: '/contacts', component: Contacts },
    { path: '/contact-edit', component: ContactEdit },
    { path: '/contact-add', component: ContactAdd }
  ]
})
