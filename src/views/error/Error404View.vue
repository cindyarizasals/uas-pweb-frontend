<template>
  <section class="hero is-small has-text-centered">
    <div class="hero-body">
      <p class="title">
        Error 404
      </p>
      <p class="subtitle">
        Sorry, we cannot find the page you are looking for
      </p>
      <p>
        <RouterLink class="has-text-centered button is-info" to="/">
          Go back
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Error404"
}
</script>

<style scoped>

</style>