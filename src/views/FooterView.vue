<template>
  <footer class="footer" style="background-color: #e2d7d4">
    <div class="content has-text-centered">
      <p><strong>Tugas UAS Pemrograman Web</strong> oleh <strong>Cindy Ariza Salsabilla dan Dwitya Maudy Alfira</strong> &copy; {{ year }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped></style>
