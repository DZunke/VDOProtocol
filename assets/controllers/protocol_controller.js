import {Controller} from 'stimulus'

/* stimulusFetch: 'lazy' */
export default class extends Controller {
    connect() {
        let that = this;

        this.focusguard();

        document.querySelectorAll('input[type="text"], textarea').forEach((elem) => {
            elem.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.keyCode === 13) { // STRG + Enter
                    that.submit();
                }

                if (e.ctrlKey && e.keyCode === 67) { // STRG + C
                    that.reset();
                }
            });
        });
    }

    focusguard() {
        document.querySelector('input[tabindex="1"]').focus();
    }

    submit() {
        document.querySelector(this.formQuery).submit();
    }

    reset() {
        document.getElementById('protocol_parent').value = '';

        let removeElement = document.getElementById('protocol-add-child-info');
        if (removeElement !== null) {
            removeElement.remove();
            document.getElementById('protocol-add-child-reset').remove();
            document.querySelectorAll('.protocol-add-highlite').forEach(el => el.remove());
        }

        document.querySelectorAll('input, textarea').forEach((elem) => {
            elem.value = '';
        });
        document.querySelectorAll('span.invalid-feedback').forEach((elem) => {
            elem.remove();
        });
        document.querySelectorAll('.is-invalid').forEach((elem) => {
            elem.classList.remove('is-invalid');
        });

        this.focusguard();
    }

    addChildEntry($event) {
        if ($event === undefined) {
            return;
        }

        $event.preventDefault()
        this.reset();

        let $element = $event.target;
        if ($event.target.nodeName === 'I') {
            $element = $event.target.parentNode;
        }

        let $id = $element.dataset.id;
        let $highliteClass = $element.dataset.highlite;
        let $idFormElement = document.getElementById('protocol_parent');

        let $highliteElement = document.createElement('div');
        $highliteElement.classList.add('protocol-add-highlite');
        $highliteElement.classList.add('card-status-start');
        $highliteElement.classList.add('bg-purple');

        if ($id === undefined) {
            return;
        }

        $idFormElement.value = $id;

        if ($highliteClass !== undefined && $highliteClass !== '') {
            let $cardElement = $element.closest('.' + $highliteClass);
            $cardElement.insertBefore($highliteElement, $cardElement.firstChild);
        }

        let formAppendingModeInfo = document.createElement('p');
        formAppendingModeInfo.id = 'protocol-add-child-info';
        formAppendingModeInfo.setAttribute('data-append', $id);
        formAppendingModeInfo.className = 'text-center mt-3';
        formAppendingModeInfo.innerHTML = '<strong>Anfügenmodus</strong>';

        $idFormElement.parentElement.prepend(formAppendingModeInfo);

        let formAppendingCancelButton = document.createElement('button');
        formAppendingCancelButton.id = 'protocol-add-child-reset';
        formAppendingCancelButton.type = 'button';
        formAppendingCancelButton.className = 'btn btn-link';
        formAppendingCancelButton.tabIndex = 4;
        formAppendingCancelButton.innerText = 'Abbrechen';

        formAppendingCancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.reset();
        });

        let $formButtonElement = document.getElementsByClassName('protocol-form-buttons');
        if ($formButtonElement.length > 0) {
            $formButtonElement = $formButtonElement[0];
            $formButtonElement.insertBefore(formAppendingCancelButton, $formButtonElement.firstChild);
        }

        this.focusguard();
    }

    get formQuery() {
        return this.data.get('formQuery');
    }
}
