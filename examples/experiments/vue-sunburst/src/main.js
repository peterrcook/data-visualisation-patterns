import Vue from 'vue'
import App from './App.vue'
import { csv } from 'd3-fetch';
import store from './store';

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

csv('./comic-relief-360-giving.csv')
    .then(data => {
        // console.log(data);
        store.setData(data);
    });
