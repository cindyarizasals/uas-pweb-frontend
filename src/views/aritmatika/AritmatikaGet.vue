<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Aritmatika dengan HTTP GET Method
      </p>
      <p class="subtitle">
        Aritmatika sederhana ke API https://kuliahweb.riaudevops.id menggunakan HTTP GET. API endpoint berada pada domain yang berbeda. Pada aplikasi backend, harus diaktifkan CORS (Cross-Origin Resource Sharing)
      </p>
    </div>
  </section>
  <section>
    <div class="form">
      <div class="field">
        <label class="label">A</label>
        <div class="control">
          <input class="input" type="number" placeholder="Nilai A" v-model="a">
        </div>
      </div>

      <div class="field">
        <label class="label">B</label>
        <div class="control">
          <input class="input" type="number" placeholder="Nilai B" v-model="b">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="hitung">Hitung</button>
        </div>
      </div>
    </div>
    <hr>
    <p class="title">
      Hasil {{hasil}}
    </p>
  </section>
</template>

<script>
export default {
  name: "AritmatikaGet",
  data(){
    return{
      a: 0,
      b: 0,
      hasil: 0
    }
  },
  methods:{
    hitung(){
      /* Data yang akan dikirim */
      const payload = {
        var1: this.a,
        var2: this.b
      };
      /* Convert ke query params URL */
      const queryParams = new URLSearchParams(payload).toString();
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`${baseurl}/aritmatika/api-get?${queryParams}`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.hasil = json.perkalian.hasil;
          })
          .catch(()=>{
            alert('Terjadi error')
          })
    }
  }
}
</script>

<style scoped>

</style>