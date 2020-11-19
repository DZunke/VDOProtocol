<template>
  <a type="button" class="btn btn-icon btn-primary btn-secondary" @click="refresh" title="Aktuelle Seite aktualisieren">
    <i class="fas fa-sync"></i>
  </a>
</template>

<script>
export default {
  name: 'refresh-button',
  methods: {
    refresh: function () {
      location.reload();
    }
  }
}
</script>
