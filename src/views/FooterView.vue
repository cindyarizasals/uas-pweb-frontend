<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Kuliah Pemrograman Web</strong> by <a href="https://github.com/pizaini/kuliah-web-2022">Pizaini</a>
        &copy; {{year}}
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>

</style>