<template>
  <div>
    <div>
      <b-button v-b-modal.modal-1 variant="primary">Adicionar Usuário</b-button>

      <b-modal id="modal-1" title="Adicionar Usuário">
        <div class="row">
          <div class="col-6">
            <b-form-input
              v-model="name"
              placeholder="Digite seu nome"
            ></b-form-input>
          </div>

          <div class="col-6">
            <b-form-input
              v-model="email"
              placeholder="Digite seu email"
              type="email"
            ></b-form-input>
          </div>

          <div class="col-6 mt-4">
            <b-form-input
              v-model="password"
              placeholder="Digite sua senha"
              type="password"
            ></b-form-input>
          </div>

          <div class="col-6 mt-4">
            <b-form-input
              v-model="phone"
              placeholder="Digite seu Telefone"
            ></b-form-input>
          </div>

          <div class="col-6 mt-4">
            <b-form-file
              v-model="image"
              :state="Boolean(image)"
              ref="file"
            ></b-form-file>
          </div>
        </div>

        <template #modal-footer>
          <div class="row mt-4">
            <div class="col-12">
              <b-button @click="criarUsuario" block variant="primary"
                >Salvar</b-button
              >
            </div>
          </div>
        </template>
      </b-modal>
    </div>

    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Telefone</th>
          <th scope="col">Imagem</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in listagem" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td><a :href="user.image" target="_blank">Ver imagem</a></td>
          <td>
            <router-link :to="{ name: 'editar', params: { usuario: user.id } }">
              <b-button variant="warning">Editar</b-button>
            </router-link>

            <b-button @click="excluir(user.id)" variant="danger"
              >Deletar</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listagem: [],
      image: null,
      name: "",
      password: "",
      email: "",
      phone: "",
    };
  },
  methods: {
    adicionarListagem() {},
    criarUsuario() {
      var file = this.$refs.file.files[0];
      var form = "";
      form = new FormData();
      form.append("image", file);
      form.append("name", this.name);
      form.append("email", this.email);
      form.append("password", this.password);
      form.append("phone", this.phone);

      this.$http
        .post("users/", form)
        .then((response) => {
          this.listagem.push(response.data);
          this.name = "";
          this.email = "";
          this.password = "";
          this.phone = "";
          this.image = null;

          alert("Usuário cadastrado com sucesso");
        })
        .catch(() => {
          alert("Dados inválidos");
        });
    },
    listar() {
      this.$http
        .get("users/")
        .then((response) => {
          this.listagem = response.data;
        })
        .catch(() => {
          alert("Nenhum usuário encontrado");
        });
    },
    excluir(id_usuario) {
      this.$http.delete(`users/${id_usuario}`).then((response) => {
        alert(`Usuário ${response.data.id} deletado com sucesso`);
        this.listar();
      });
    },
  },
  created() {
    this.listar();
  },
};
</script>


<style>
</style>
