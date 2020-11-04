<template>
  <div v-if="loading" class="js-loader modal-backdrop"
       style="display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.8;">
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data() {
    return {
      loading: false,
    }
  },
  mounted: function () {
    let vue = this;

    document.querySelectorAll('a, form, button[type="submit"]').forEach(function (elem) {
      elem.addEventListener('click', ($event) => {
        if (elem !== $event.target) return;
        vue.check($event.currentTarget);
      });
    });

    document.addEventListener('keydown', function ($e) {
      if (($e.which || $e.keyCode) === 116) { // F5
        vue.check();
      }
    });

  },
  methods: {
    check($element) {
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
    },
    load() {
      this.loading = true;
    },
    unload() {
      this.loading = false;
    }
  }
}
</script>
