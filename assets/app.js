// any CSS you require will output into a single css file (app.css in this case)
// require('tabler-ui/dist/assets/css/dashboard.css');
require('@tabler/core/dist/css/tabler.min.css');
require('./css/app.scss');
require('./css/fontawesome.min.css');
require('./css/brands.min.css');
require('./css/solid.css');

import 'bootstrap';
import './bootstrap'
import '@tabler/core';

const $ = require('jquery');
global.$ = global.jQuery = $;
