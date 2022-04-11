<script>
import FooterView from "./views/FooterView.vue";
import TopNavView from "./views/TopNavView.vue";
export default {
  components: {TopNavView, FooterView}
}
</script>

<template>
  <TopNavView/>
  <main>
    <div class="container">
      <RouterView/>
    </div>
  </main>
  <FooterView/>
</template>