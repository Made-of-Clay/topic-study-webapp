// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuec from 'vue-container';
import TopicsService from './topics.service';

Vue.config.productionTip = false;
Vue.use(Vuec);

Vue.$ioc.register('topicsService', new TopicsService());

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    services: [''],
    components: { App }
});
