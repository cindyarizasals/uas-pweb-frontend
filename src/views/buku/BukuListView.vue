<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Buku
      </p>
      <p class="subtitle">
        Menampilkan buku, tambah data, edit dan delete. API endpoint https://kuliahweb.riaudevops.id/buku/
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Data baru</span>
      </button>
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>ISBN</th>
          <th>Pengarang</th>
          <th>Judul</th>
          <th>Jumlah</th>
          <th>Tanggal buku</th>
          <th>Kategori</th>
          <th>Created at</th>
          <th>#</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.isbn}}</td>
          <td>{{value.pengarang}}</td>
          <td>{{value.judul}}</td>
          <td>{{value.jumlah}} item</td>
          <td>{{value.tanggal}}</td>
          <td>{{value.kategori.nama}}</td>
          <td>{{value.created_at}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'buku-detail', params: { isbn:  value.isbn}}">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                  <span>Detail</span>
                </RouterLink>
              </p>
              <p class="control">
                <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                  <span>Edit</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </p>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9">
            <div class="notification is-warning">
              Tidak ada data
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>ISBN <strong>{{data[selectedIndex].isbn}}</strong></li>
            <li>JUDUL <strong>{{data[selectedIndex].judul}}</strong></li>
            <li>PENGARANG <strong>{{data[selectedIndex].pengarang}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="judul_update">Judul</label>
              <div class="control">
                <input class="input" type="text" id="judul_update" placeholder="Judul" required v-model="formEdit.judul">
              </div>
            </div>
            <div class="field">
              <label class="label" for="pengarang_update">Pengarang</label>
              <div class="control">
                <input class="input" type="text" id="pengarang_update" placeholder="Pengarang" required v-model="formEdit.pengarang">
              </div>
            </div>
            <div class="field">
              <label class="label" for="kategori_update">Kategori</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="kategori_update" id="kategori_update" v-model="formEdit.kategori">
                    <option v-for="val in kategori" :value="val.id">{{val.nama}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="jumlah_update">Jumlah</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="number" id="jumlah_update" placeholder="Jumlah" required v-model="formEdit.jumlah" min="1" max="10000">
                </p>
                <p class="control">
                  <a class="button is-static">
                    item
                  </a>
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label" for="tanggal_update">Tanggal buku</label>
              <div class="control">
                <input class="input" type="date" id="tanggal_update" placeholder="Tanggal" required v-model="formEdit.tanggal">
              </div>
            </div>
            <div class="field">
              <label class="label" for="abstrak_update">Abstrak</label>
              <div class="control">
                <textarea id="abstrak_update" class="textarea" placeholder="Abstrak" v-model="formEdit.abstrak"></textarea>
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="isbn_insert">ISBN</label>
            <div class="control">
              <input class="input" type="text" id="isbn_insert" placeholder="ISBN" required v-model="formAdd.isbn">
            </div>
          </div>
          <div class="field">
            <label class="label" for="judul_insert">Judul</label>
            <div class="control">
              <input class="input" type="text" id="judul_insert" placeholder="Judul" required v-model="formAdd.judul">
            </div>
          </div>
          <div class="field">
            <label class="label" for="pengarang_insert">Pengarang</label>
            <div class="control">
              <input class="input" type="text" id="pengarang_insert" placeholder="Pengarang" required v-model="formAdd.pengarang">
            </div>
          </div>
          <div class="field">
            <label class="label" for="kategori_insert">Kategori</label>
            <div class="control">
              <div class="select is-primary">
                <select name="kategori_insert" id="kategori_insert" v-model="formAdd.kategori">
                  <option value="0" disabled>---Kategori---</option>
                  <option v-for="val in kategori" :value="val.id">{{val.nama}}</option>
                </select>
              </div>
            </div>
          </div>
         <div class="field">
           <label class="label" for="jumlah_insert">Jumlah</label>
           <div class="field has-addons">
             <p class="control is-expanded">
               <input class="input" type="number" id="jumlah_insert" placeholder="Jumlah" required v-model="formAdd.jumlah" min="1" max="10000">
             </p>
             <p class="control">
               <a class="button is-static">
                 item
               </a>
             </p>
           </div>
         </div>
          <div class="field">
            <label class="label" for="tanggal_insert">Tanggal buku</label>
            <div class="control">
              <input class="input" type="date" id="tanggal_insert" placeholder="Tanggal" required v-model="formAdd.tanggal">
            </div>
          </div>
          <div class="field">
            <label class="label" for="abstrak_insert">Abstrak</label>
            <div class="control">
              <textarea id="abstrak_insert" class="textarea" placeholder="Abstrak" v-model="formAdd.abstrak"></textarea>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";

export default {
  name: "BukuListView",
  data(){
    return{
      data: [],
      kategori: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        isbn: '',
        kategori: 0,
        pengarang: '',
        judul: '',
        abstrak: '',
        jumlah: 1,
        tanggal: new Date().toISOString().slice(0, 10)
      },
      formEdit: {
        isbn: '',
        kategori: 0,
        pengarang: '',
        judul: '',
        abstrak: '',
        jumlah: 1,
        tanggal: new Date().toISOString().slice(0, 10)
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`${baseurl}/buku`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.data = json.data;
          })
          .catch(()=>{
            alert('Terjadi error')
          })
          .finally(()=>{
            this.isLoading = false;
          })
    },
    loadKategori(){
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`${baseurl}/kategori`,{
        method: 'GET',
      })
          .then(response => {
            if(response.ok){
              return response.json();
            }
          })
          .then(json => {
            this.kategori = json.data;
          })
          .catch(()=>{
            alert('Terjadi error')
          })
          .finally(()=>{
            this.isLoading = false;
          })
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const selectedData = this.data[this.selectedIndex];

        const payload = new URLSearchParams({
          'isbn': selectedData.isbn
        });

        fetch(`${baseurl}/buku/delete`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'API-Key': 'secret'
          },
          body: payload.toString(),
        })
            .then(response => {
              if(response.ok){
                this.data.splice(this.selectedIndex, 1);
              }
              return response.json();
            })
            .then(json =>{
              if(!json.status){
                alert(json.error);
              }
            })
            .catch(()=>{
              alert('Terjadi error')
            })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          abstrak: this.formEdit.abstrak,
          judul: this.formEdit.judul,
          pengarang: this.formEdit.pengarang,
          tanggal: this.formEdit.tanggal,
          kategori: this.formEdit.kategori,
          jumlah: this.formEdit.jumlah,
          isbn: this.formEdit.isbn,
        });

        fetch(`${baseurl}/buku/update`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'API-Key': 'secret'
          },
          body: payload.toString(),
        })
            .then(response => {
              return response.json()
            })
            .then(json =>{
              if(!json.status){
                alert(json.error);
              }else{
                /*
                Update data pada kolom yg diupdate
                 */
                this.data[this.selectedIndex] = json.data;
              }
            })
            .catch( (e) =>{
              alert('Terjadi error'+e.toString())
            })
            .finally(()=>{
              this.selectedIndex = -1;
            })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.data[index];
      this.formEdit = {
        isbn: selectedData.isbn,
        judul: selectedData.judul,
        abstrak: selectedData.abstrak,
        jumlah: selectedData.jumlah,
        kategori: selectedData.kategori.id,
        pengarang: selectedData.pengarang,
        tanggal: selectedData.tanggal,
      }
      nextTick(()=>{
        document.getElementById('judul_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('isbn_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        abstrak: this.formAdd.abstrak,
        judul: this.formAdd.judul,
        pengarang: this.formAdd.pengarang,
        tanggal: this.formAdd.tanggal,
        kategori: this.formAdd.kategori,
        jumlah: this.formAdd.jumlah,
        isbn: this.formAdd.isbn,
      });

      fetch(`${baseurl}/buku/create`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'API-Key': 'secret'
        },
        body: payload.toString(),
      })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              this.data.push(json.data);
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.formAdd.nama = '';
          })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        abstrak: '',
        judul: '',
        jumlah: 1,
        kategori: 0,
        pengarang: '',
        tanggal: new Date().toISOString().slice(0, 10)
      }
    }
  },
  mounted() {
    this.load();
    this.loadKategori();
  }
}
</script>

<style scoped>

</style>