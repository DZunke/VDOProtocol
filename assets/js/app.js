// any CSS you require will output into a single css file (app.css in this case)
require('tabler-ui/dist/assets/css/dashboard.css');
require('../css/app.scss');
require('../css/fontawesome.min.css');
require('../css/brands.min.css');
require('../css/solid.css');

import Vue from 'vue'
import Loader from './Components/Loader';
import RefreshButton from './Components/RefreshButton';
import Protocol from './Components/Protocol';

Vue.use(Loader);
Vue.use(RefreshButton);
Vue.use(Protocol);
new Vue({
    el: "#app",
    components: {
        'loader': Loader,
        'refresh-button': RefreshButton,
        'protocol': Protocol
    },
});
