<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Aritmatika
      </p>
      <p class="subtitle">
        Aritmatika sederhana ke API localhost
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
  name: "Aritmatika",
  data(){
    return{
      a: 0,
      b: 0,
      hasil: 0
    }
  },
  methods:{
    hitung(){
      const payload = {
        var1: this.a,
        var2: this.b
      };

      fetch(`http://backend-api.localhost/api.php`,{
        method: 'POST',
        body: JSON.stringify(payload),
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