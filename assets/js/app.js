// any CSS you require will output into a single css file (app.css in this case)
require('tabler-ui/dist/assets/css/dashboard.css');
require('../css/app.scss');
require('../css/fontawesome.min.css');
require('../css/brands.min.css');
require('../css/solid.css');

const $ = require('jquery');
global.$ = global.jQuery = $;

import 'bootstrap';

require('./core');
require('./protocol');

// Send Browser Push Notifications
// import * as Notifier from './modules/push.js';
// Notifier.sendNotification('Foo');