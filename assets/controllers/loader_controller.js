import {Controller} from 'stimulus';

export default class extends Controller {
    #activeLoaderId = 'active-loader-element'

    connect() {
        let that = this;

        window.onbeforeunload = function (e) {
            // Removed due to double loading of loader and no-loader class on click is not working
            // that.check();
        };

        document.querySelectorAll('a, button[type="submit"]').forEach(function (elem) {
            elem.addEventListener('click', ($event) => {
                if (elem !== $event.target) return;

                let $element = $event.currentTarget;
                if ($event.target.nodeName === 'I') {
                    $element = $event.currentTarget.parentNode;
                }

                that.check($element);
            });
        });

        document.addEventListener('keydown', function ($e) {
            if (($e.which || $e.keyCode) === 116) { // F5
                that.check();
            }
        });
    }

    check($element) {
        let $existingLoader = document.getElementById(this.activeLoaderId);
        if ($existingLoader !== null) {
            return;
        }

        if ($element !== undefined && $element.classList.contains('no-loader')) {
            return;
        }

        if ($element !== undefined) {
            let $checkForm = $element.getAttribute('data-check-form');
            if ($checkForm !== null) {
                let $form = document.querySelector('form[name="' + $checkForm + '"]');
                if ($form === null || $form.noValidate || $form.checkValidity()) {
                    this.load();
                }

                return;
            }
        }

        this.load();
    }

    load() {
        if (document.getElementById(this.activeLoaderId) !== null) {
            return;
        }

        let $template = document.getElementById(this.templateId);
        let $loaderElement = $template.content.cloneNode(true);
        $loaderElement.querySelector('div').id = this.activeLoaderId;

        document.body.append($loaderElement);
    }

    unload() {
        document.getElementById(this.activeLoaderId).remove();
    }

    get templateId() {
        return this.data.get('templateId');
    }

    get activeLoaderId() {
        return this.#activeLoaderId;
    }
}
