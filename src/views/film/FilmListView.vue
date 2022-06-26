<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">Film</p>
      <p class="subtitle">Menampilkan data film, tambah, edit dan delete data film.</p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>Tambah Film</span>
      </button>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Judul Film</th>
            <th>Sutradara</th>
            <th>Tanggal</th>
            <th>Genre</th>
            <th>Negara</th>
            <th>Sinopsis</th>
            <th>Created at</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="data.length" v-for="(value, index) in data">
            <td>{{ index + 1 }}</td>
            <td>{{ value.id }}</td>
            <td>{{ value.judul }}</td>
            <td>{{ value.sutradara }}</td>
            <td>{{ value.tanggal }}</td>
            <td>{{ value.kategori.nama }}</td>
            <td>{{ value.negara.nama }}</td>
            <td>{{ value.deskripsi }}</td>
            <td>{{ value.created_at }}</td>
            <td>
              <div class="field has-addons">
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
              <div class="notification is-warning">Tidak ada data</div>
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
        <p class="modal-card-title">Hapus data film ini?</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>
              ID <strong>{{ data[selectedIndex].id }}</strong>
            </li>
            <li>
              Judul Film <strong>{{ data[selectedIndex].judul }}</strong>
            </li>
            <li>
              Sutradara <strong>{{ data[selectedIndex].sutradara }}</strong>
            </li>
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
        <p class="modal-card-title">Edit Data Film</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="judul_update">Judul Film</label>
              <div class="control">
                <input class="input" type="text" id="judul_update" placeholder="Judul" required v-model="formEdit.judul" />
              </div>
            </div>
            <div class="field">
              <label class="label" for="sutradara_update">Sutradara</label>
              <div class="control">
                <input class="input" type="text" id="sutradara_update" placeholder="Sutradara" required v-model="formEdit.sutradara" />
              </div>
            </div>
            <div class="field">
              <label class="label" for="tanggal_update">Tanggal Rilis</label>
              <div class="control">
                <input class="input" type="date" id="tanggal_update" placeholder="Tanggal Rilis" required v-model="formEdit.tanggal" />
              </div>
            </div>
            <div class="field">
              <label class="label" for="kategori_update">Genre Film</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="kategori_update" id="kategori_update" v-model="formEdit.kategori">
                    <option v-for="val in kategori" :value="val.id">{{ val.nama }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="negara_update">Asal Negara</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="negara_update" id="negara_update" v-model="formEdit.negara">
                    <option v-for="val in negara" :value="val.id">{{ val.nama }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="abstrak_update">Sinopsis</label>
              <div class="control">
                <textarea id="abstrak_update" class="textarea" placeholder="Sinopsis" v-model="formEdit.abstrak"></textarea>
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
        <p class="modal-card-title">Tambah Data Film Baru</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="judul_insert">Judul Film</label>
            <div class="control">
              <input class="input" type="text" id="judul_insert" placeholder="Judul" required v-model="formAdd.judul" />
            </div>
          </div>
          <div class="field">
            <label class="label" for="sutradara_insert">Sutradara</label>
            <div class="control">
              <input class="input" type="text" id="sutradara_insert" placeholder="Sutradara" required v-model="formAdd.sutradara" />
            </div>
          </div>
          <div class="field">
            <label class="label" for="kategori_insert">Genre</label>
            <div class="control">
              <div class="select is-primary">
                <select name="kategori_insert" id="kategori_insert" v-model="formAdd.kategori">
                  <option value="0" disabled>---Genre Film---</option>
                  <option v-for="val in kategori" :value="val.id">{{ val.nama }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="negara_insert">Negara</label>
            <div class="control">
              <div class="select is-primary">
                <select name="negara_insert" id="negara_insert" v-model="formAdd.negara">
                  <option value="0" disabled>---Asal Negara---</option>
                  <option v-for="val in negara" :value="val.id">{{ val.nama }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="tanggal_insert">Tanggal Rilis</label>
            <div class="control">
              <input class="input" type="date" id="tanggal_insert" placeholder="Tanggal" required v-model="formAdd.tanggal" />
            </div>
          </div>
          <div class="field">
            <label class="label" for="deskripsi_insert">Sinopsis</label>
            <div class="control">
              <textarea id="deskripsi_insert" class="textarea" placeholder="Sinopsis Film" v-model="formAdd.deskripsi"></textarea>
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
import { nextTick } from "vue";

export default {
  name: "FilmListView",
  data() {
    return {
      data: [],
      kategori: [],
      negara: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        kategori: 0,
        sutradara: "",
        judul: "",
        deskripsi: "",
        negara: 0,
        tanggal: new Date().toISOString().slice(0, 10),
      },
      formEdit: {
        id: "",
        kategori: 0,
        sutradara: "",
        judul: "",
        abstrak: "",
        negara: 0,
        tanggal: new Date().toISOString().slice(0, 10),
      },
    };
  },
  methods: {
    load() {
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`${baseurl}/film`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((json) => {
          this.data = json.data;
        })
        .catch(() => {
          alert("Terjadi error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadKategori() {
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`${baseurl}/kategori`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((json) => {
          this.kategori = json.data;
        })
        .catch(() => {
          alert("Terjadi error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadNegara() {
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`${baseurl}/negara`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((json) => {
          this.negara = json.data;
        })
        .catch(() => {
          alert("Terjadi error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    remove() {
      this.closeModal("modal-delete");
      if (this.selectedIndex >= 0) {
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const selectedData = this.data[this.selectedIndex];

        const payload = new URLSearchParams({
          id: selectedData.id,
        });

        fetch(`${baseurl}/film/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "API-Key": "secret",
          },
          body: payload.toString(),
        })
          .then((response) => {
            if (response.ok) {
              console.log(this.selectedIndex, this.data);
              this.data.splice(this.selectedIndex, 1);
              console.log(this.data);
            }
            return response.json();
          })
          .then((json) => {
            if (!json.status) {
              alert(json.error);
            }
          })
          .catch(() => {
            alert("Terjadi error");
          });
      }
      this.selectedIndex = -1;
    },
    update() {
      this.closeModal("modal-update");
      if (this.selectedIndex >= 0) {
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          deskripsi: this.formEdit.deskripsi,
          judul: this.formEdit.judul,
          sutradara: this.formEdit.sutradara,
          tanggal: this.formEdit.tanggal,
          kategori: this.formEdit.kategori,
          negara: this.formEdit.negara,
          id: this.formEdit.id,
        });

        fetch(`${baseurl}/film/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "API-Key": "secret",
          },
          body: payload.toString(),
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            if (!json.status) {
              alert(json.error);
            } else {
              /*
                Update data pada kolom yg diupdate
                 */
              this.data[this.selectedIndex] = json.data;
            }
          })
          .catch((e) => {
            alert("Terjadi error" + e.toString());
          })
          .finally(() => {
            this.selectedIndex = -1;
          });
      }
    },
    showDelete(index) {
      this.showModal("modal-delete");
      this.selectedIndex = index;
    },
    showUpdate(index) {
      this.showModal("modal-update");
      this.selectedIndex = index;
      const selectedData = this.data[index];
      this.formEdit = {
        id: selectedData.id,
        judul: selectedData.judul,
        deskripsi: selectedData.deskripsi,
        kategori: selectedData.kategori.id,
        sutradara: selectedData.sutradara,
        negara: selectedData.negara.id,
        tanggal: selectedData.tanggal,
      };
      nextTick(() => {
        document.getElementById("judul_update").focus();
      });
    },
    showAdd() {
      this.resetFormAdd();
      this.showModal("modal-add");
      nextTick(() => {
        document.getElementById("judul_insert").focus();
      });
    },
    addNew() {
      this.closeModal("modal-add");
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        deskripsi: this.formAdd.deskripsi,
        judul: this.formAdd.judul,
        sutradara: this.formAdd.sutradara,
        tanggal: this.formAdd.tanggal,
        kategori: this.formAdd.kategori,
        negara: this.formAdd.negara,
      });

      fetch(`${baseurl}/film/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "API-Key": "secret",
        },
        body: payload.toString(),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (!json.status) {
            alert(json.error);
          } else {
            this.data.push(json.data);
          }
        })
        .catch((e) => {
          alert("Terjadi error" + e.toString());
        })
        .finally(() => {
          this.formAdd.nama = "";
        });
    },
    showModal(id) {
      document.getElementById(id).classList.add("is-active");
    },
    closeModal(id) {
      document.getElementById(id).classList.remove("is-active");
    },
    resetFormAdd() {
      this.formAdd = {
        deskripsi: "",
        judul: "",
        negara: 0,
        kategori: 0,
        sutradara: "",
        tanggal: new Date().toISOString().slice(0, 10),
      };
    },
  },
  mounted() {
    this.load();
    this.loadKategori();
    this.loadNegara();
  },
};
</script>

<style scoped></style>
