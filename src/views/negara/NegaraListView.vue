<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">Negara Asal Film</p>
      <p class="subtitle">Menampilkan daftar negara asal film, tambah, edit dan delete data negara asal film.</p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>Tambah Negara</span>
      </button>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Nama Negara</th>
            <th>Created at</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="data.length" v-for="(value, index) in data">
            <td>{{ index + 1 }}</td>
            <td>{{ value.id }}</td>
            <td>{{ value.nama }}</td>
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
            <td colspan="5">
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
        <p class="modal-card-title">Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>
              ID <strong>{{ data[selectedIndex].id }}</strong>
            </li>
            <li>
              NAMA <strong>{{ data[selectedIndex].nama }}</strong>
            </li>
            <li>
              Created at <strong>{{ data[selectedIndex].created_at }}</strong>
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
        <p class="modal-card-title">Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_update">Nama Negara</label>
              <div class="control">
                <input id="nama_update" class="input" type="text" placeholder="Nama Negara" required v-model="formEdit.nama" />
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
            <label class="label" for="nama_add">Nama Negara</label>
            <div class="control">
              <input id="nama_add" class="input" type="text" placeholder="Nama Negara" required v-model="formAdd.nama" />
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
  name: "NegaraListView",
  data() {
    return {
      data: [],
      selectedIndex: -1,
      isLoading: false,
      formEdit: {
        nama: "",
        id: 0,
      },
      formAdd: {
        nama: "",
      },
    };
  },
  methods: {
    load() {
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
          this.data = json.data;
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

        fetch(`${baseurl}/negara/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "API-Key": "secret",
          },
          body: payload.toString(),
        })
          .then((response) => {
            if (response.ok) {
              this.data.splice(this.selectedIndex, 1);
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
          nama: this.formEdit.nama,
          id: this.formEdit.id,
        });

        fetch(`${baseurl}/negara/update`, {
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
      this.formEdit.id = selectedData.id;
      this.formEdit.nama = selectedData.nama;
      nextTick(() => {
        document.getElementById("nama_update").focus();
      });
    },
    showAdd() {
      this.showModal("modal-add");
      nextTick(() => {
        document.getElementById("nama_add").focus();
      });
    },
    addNew() {
      this.closeModal("modal-add");
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        nama: this.formAdd.nama,
      });

      fetch(`${baseurl}/negara/create`, {
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
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped></style>
