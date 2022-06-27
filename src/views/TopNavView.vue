<template>
  <nav class="navbar" style="background-color: #e2d7d4">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/"> <img src="/images/logoweb.png" alt="Logo" /> Tugas UAS </RouterLink>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <RouterLink class="navbar-item" to="/"> HOME </RouterLink>
          <RouterLink class="navbar-item" to="/film"> FILM </RouterLink>
          <RouterLink class="navbar-item" to="/kategori"> GENRE </RouterLink>
          <RouterLink class="navbar-item" to="/negara"> NEGARA </RouterLink>
          <RouterLink class="navbar-item" to="/contact"> CONTACT </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
export default {
  name: "TopNavView",
};
</script>

<style scoped></style>
