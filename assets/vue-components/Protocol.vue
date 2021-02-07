<script>
export default {
  name: 'protocol',
  props: {
    submitFormQuery: {type: String, default: '.unknown-object-class'}
  },
  render() {
    return this.$slots.default;
  },
  mounted: function () {
    this.focusguard();
  },
  methods: {
    focusguard() {
      document.querySelector('input[tabindex="1"]').focus();
    },
    submit() {
      document.querySelector(this.$props.submitFormQuery).submit();
    },
    reset() {
      document.getElementById('protocol_parent').value = '';

      let removeElement = document.getElementById('protocol-add-child-info');
      if (removeElement !== null) {
        removeElement.remove();
        document.getElementById('protocol-add-child-reset').remove();
        document.querySelectorAll('.protocol-add-child-highlite').forEach((elem) => {
          elem.classList.remove('protocol-add-child-highlite');
        });
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
    },
    addChildEntry($element) {
      let vue = this;

      this.reset();

      let $id = $element.dataset.id;
      let $highliteClass = $element.dataset.highlite;
      let $idFormElement = document.getElementById('protocol_parent');

      if ($id === undefined) {
        return;
      }

      $idFormElement.value = $id;

      if ($highliteClass !== undefined && $highliteClass !== '') {
        $element.closest('.' + $highliteClass).classList.add('protocol-add-child-highlite');
      }

      let formAppendingModeInfo = document.createElement('p');
      formAppendingModeInfo.id = 'protocol-add-child-info';
      formAppendingModeInfo.setAttribute('data-append', $id);
      formAppendingModeInfo.className = 'text-center';
      formAppendingModeInfo.innerHTML = '<strong>Anfügenmodus</strong>';
      $idFormElement.parentElement.prepend(formAppendingModeInfo);

      let formAppendingCancelButton = document.createElement('button');
      formAppendingCancelButton.id = 'protocol-add-child-reset';
      formAppendingCancelButton.type = 'button';
      formAppendingCancelButton.className = 'btn btn-block btn-primary';
      formAppendingCancelButton.tabIndex = 4;
      formAppendingCancelButton.innerText = 'Abbrechen';

      formAppendingCancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        vue.reset();
      });

      $idFormElement.parentElement.append(formAppendingCancelButton);

      this.focusguard();
    }
  }
}
</script>
