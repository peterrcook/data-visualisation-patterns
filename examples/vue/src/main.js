import Vue from 'vue'
import App from './App.vue'
import { json } from 'd3-fetch';
import store from './store';

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

json('data/data.json')
    .then(data => {
        console.log(data);
        store.setData(data);
    });

