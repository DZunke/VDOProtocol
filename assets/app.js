// any CSS you require will output into a single css file (app.css in this case)
require('tabler-ui/dist/assets/css/dashboard.css');
require('./css/app.scss');
require('./css/fontawesome.min.css');
require('./css/brands.min.css');
require('./css/solid.css');

import './bootstrap';

const $ = require('jquery');
global.$ = global.jQuery = $;

import Vue from 'vue'
import Protocol from './vue-components/Protocol';

Vue.use(Protocol);

let app = new Vue({
    el: "#app",
    components: {
        'protocol': Protocol
    },
});

window.app = app;
