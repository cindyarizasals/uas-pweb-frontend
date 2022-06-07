<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Surah Annas
      </p>
      <p class="subtitle">
        Dari api.quran.com
      </p>
    </div>
  </section>

  <section>
    <h3 class="has-text-right" v-if="chapter">{{chapter.name_arabic}} {{chapter.verses_count}}</h3>
    <hr>
    <div v-for="verse in verses">
      <p class="has-text-right">{{verse.text_uthmani}} {{verse.verse_key}}</p>
      <hr>
    </div>
    <p>terjemahan</p>
  </section>
</template>

<script>
export default {
  name: 'AnnasView',
  data(){
    return{
      chapter: null,
      verses: []
    }
  },
  methods:{
    getChapter(){
      fetch('https://api.quran.com/api/v4/chapters/114?language=id',{
        method: 'GET',
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
    getVerses(){
      fetch('https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=114',{
        method:'GET'
      })
      .then(resp => {
        if(resp.ok){
          return resp.json()
        }
      })
      .then(json => {
        this.verses = json.verses
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