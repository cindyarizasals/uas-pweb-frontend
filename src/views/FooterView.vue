<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Kuliah Pemrograman Web</strong> by <a href="https://github.com/pizaini/kuliah-web-2022">Pizaini</a>
        &copy; {{year}}
      </p>
      <p>
        <img src="https://bulma.io/images/made-with-bulma.png" alt="made with bulma" width="120" class="mr-3">
        <img src="https://docs.vuejs.id/images/logo.png" alt="made with vuejs" width="22">
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