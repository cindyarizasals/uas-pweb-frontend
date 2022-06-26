<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p><strong>Tugas UAS Pemrograman Web</strong> oleh <a>Cindy Ariza Salsabilla dan Dwitya Maudy Alfira</a> &copy; {{ year }}</p>
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
