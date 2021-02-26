import Vue from 'vue';
import App from './App.vue';
import store from './store';
import DateFormat from './mixins/DateFormat';
import NumberFormat from './mixins/NumberFormat';
import isMobile from './mixins/isMobile';
import './components';

import './assets/sass/index.scss';

Vue.config.productionTip = false;

Vue.mixin(DateFormat);
Vue.mixin(NumberFormat);
Vue.mixin(isMobile);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
