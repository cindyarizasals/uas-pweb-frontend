<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Detail buku
      </p>
      <p class="subtitle">
        Menampilkan daftar rincian buku berdasarkan ISBN
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="buku">
      <div class="card">
        <div class="card-image">
          <figure class="image is-3by1">
            <img src="/images/book.jpg" alt="image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/images/book-square.jpg" alt="image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">ISBN {{isbn}}</p>
              <p class="subtitle is-6">ISBN {{isbn}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>ISBN</dt>
              <dd><strong>{{buku.isbn}}</strong></dd>

              <dt>Judul</dt>
              <dd><strong>{{buku.judul}}</strong></dd>

              <dt>Kategori</dt>
              <dd><strong>{{buku.kategori.nama}}</strong></dd>

              <dt>Pengarang</dt>
              <dd><strong>{{buku.pengarang}}</strong></dd>

              <dt>Jumlah</dt>
              <dd><strong>{{buku.jumlah}} item</strong></dd>

              <dt>Tanggal buku</dt>
              <dd><strong>{{buku.tanggal}}</strong></dd>

              <dt>Abstrak</dt>
              <dd><strong>{{buku.abstrak}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/buku" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
              <div class="column has-text-right">
                Created at {{buku.created_at}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, buku dengan <strong>ISBN `{{isbn}}` tidak ditemukan</strong>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "BukuDetailView",
  data() {
    return {
      buku: null,
      isbn: this.$route.params.isbn,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`${baseurl}/buku/get?isbn=${this.isbn}`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.buku = json.data;
          })
          .catch(()=>{
            alert('Terjadi error')
          })
          .finally(()=>{
            this.isLoading = false;
          })
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>

</style>