import Push from 'push.js';

function sendNotification($title, $message, $timeout = 4000, $clickFunction = function () {
    window.focus();
    this.close();
}) {
    Push.create($title, {
        body: $message,
        icon: '/images/hertha_96x96.png',
        timeout: $timeout,
        onClick: $clickFunction
    });
}

export { sendNotification };