import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from './axios'
import VueAxios from 'vue-axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})


router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});

router.afterEach(route => {
  route;
  ViewUI.LoadingBar.finish();
});


