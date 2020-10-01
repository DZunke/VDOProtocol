<template>
  <a type="button" class="btn btn-icon btn-primary btn-secondary btn-refresh" title="Aktuelle Seite aktualisieren">
    <i class="fas fa-sync"></i>
  </a>
</template>

<script>
export default {
  name: 'refresh-button',
  mounted: function () {
    document.querySelectorAll('.btn-refresh').forEach(function (elem) {
      elem.addEventListener('click', function (e) {
        e.preventDefault();
        location.reload();
      });
    });
  }
}
</script>
