<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Surah Annas
      </p>
      <p class="subtitle">
        Surah Annas
      </p>
    </div>
  </section>
  <section>
    <h1>Ayat</h1>
    <p v-if="ayat">{{ayat.name_arabic}}</p>

    <div v-for="verse in verses" class="has-text-right">
      <p>{{verse.verse_key}} {{verse.text_uthmani}}
      </p>
      <hr/>
    </div>
  </section>
</template>

<script>
export default {
  name: "AnnasView",
  data(){
    return{
      verses: [],
      transaction: null,
      ayat: null
    }
  },
  methods:{
    getChapter(){
      fetch('https://api.quran.com/api/v4/chapters/114?language=id', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if(response.ok){
          return response.json()
        }
      })
      .then(json => {
        this.ayat = json.chapter;
      })
    },
    getVerses(){
      fetch('https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=114', {
        method: 'GET'
      })
      .then(res => {
        if(res.ok){
          return res.json();
        }
      })
      .then(json =>{
        this.verses = json.verses;
        console.log(this.verses)
      })
    }
  },
  mounted() {
    this.getChapter();
    this.getVerses();
  }
}
</script>

<style scoped>

</style>