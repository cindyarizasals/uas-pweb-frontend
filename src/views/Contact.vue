<template>
  <section class="semua">
    <section class="page-section" id="team">
      <div class="container">
        <div class="text-center">
          <h2 class="section-heading text-uppercase">CONTACT</h2>
          <h3 class="section-subheading">If you want to contact us, just let us know.</h3>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="/src/assets/2.png" alt="..." />
              <h4 class="media">Email</h4>
              <p class="tl">dwityamaudy@gmail.com</p>
              <a class="btn btn-social mx-2" style="background-image: url('src/assets/email.png')" href="mailto:dwityamaudy@gmail.com"></a>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="/src/assets/1.jpg" alt="..." />
              <h4 class="media">Instagram</h4>
              <p class="tl">@cindyarizasals</p>
              <a class="btn btn-social mx-2" style="background-image: url('src/assets/ig.png')" href="https://www.instagram.com/cindyarizasals/"></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import FooterView from "../views/FooterView.vue";
export default {
  components: { FooterView },
};
</script>

<style scoped>
.team-member {
  margin-bottom: 3rem;
  text-align: center;
}
.team-member img {
  width: 14rem;
  height: 14rem;
  border: 0.5rem solid rgba(0, 0, 0, 0.1);
}
.team-member h4,
.team-member .h4 {
  margin-top: 1.5rem;
  margin-bottom: 0;
}

.page-section {
  background-size: cover;
  background-repeat: no-repeat;
}

.section-heading {
  padding-top: 50px;
  font-family: "Segoe UI";
  font-weight: bold;
  font-size: 40px;
  color: #db825b;
}
.section-subheading {
  font-family: "Segoe UI";
  font-size: 25px;
  color: #db825b;
  padding-bottom: 40px;
}
.tl {
  font-family: "Segoe UI";
  font-size: 18px;
  color: #db825b;
}
.media {
  font-family: "Segoe UI";
  font-size: 25px;
  color: white;
}
.btn-social {
  height: 2.5rem;
  width: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
