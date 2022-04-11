<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Surah An-Nass
      </p>
      <p class="subtitle">
        Surah An-Nass
      </p>
    </div>
  </section>
  <section>
    <h1 class="has-text-right" v-if="chapter">{{chapter.name_arabic}}
      <br>{{chapter.verses_count}} Ayat</h1>
    <hr>
    <div v-for="verse in verses">
      <p class="has-text-right quran">
        {{verse.text_uthmani}} {{verse.verse_key}}
      </p>
      <hr>
    </div>
  </section>
</template>

<script>
export default {
  name: "AnnasView",
  data(){
    return{
      chapter: null,
      verses: [],
    }
  },
  methods: {
    async getChapter(){
      fetch('https://api.quran.com/api/v4/chapters/114?language=id',{
        method: 'GET'
      })
      .then(response => {
        if(response.ok){
          return response.json();
        }
      })
      .then(json => {
        this.chapter = json.chapter;
      })
    },
    async getVerses(){
      fetch('https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=114', {
        method: 'GET'
      })
      .then(res =>{
        if(res.ok){
          return res.json()
        }
      })
      .then(json => {
        this.verses = json.verses;
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
@import "/src/css/app.css";
</style>