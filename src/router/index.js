import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '@/components/common/login';

import Balance from '@/components/balance/balance';

import Inputs from '@/components/inputs/inputs';
import InputEdit from '@/components/inputs/edit';

import Outputs from '@/components/outputs/outputs';
import OutputEdit from '@/components/outputs/edit';

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
    { path: '/input-edit', component: InputEdit },

    { path: '/outputs', component: Outputs },
    { path: '/output-edit', component: OutputEdit },

    { path: '/contacts', component: Contacts },
    { path: '/contact-edit', component: ContactEdit },
    { path: '/contact-add', component: ContactAdd }
  ]
})
