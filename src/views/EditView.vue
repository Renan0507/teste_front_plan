<template>
  <div>
    <h1>Editar Usuário {{ this.$route.params.id }}</h1>
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

      <div class="col-4 mt-4">
        <b-form-file
          :state="Boolean(image)"
          ref="file"
        ></b-form-file>
        <div class="mt-4">
          <b-button variant="primary" :href="image" target="_blank"
            >Arquivo atual</b-button
          >
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <b-button @click="updateUser" block variant="primary"
            >Salvar</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      name: "",
      password: "",
      email: "",
      phone: "",
    };
  },
  methods: {
    getUser() {
      this.$http
        .get(`/users/${this.$route.params.usuario}`)
        .then((response) => {
          this.name = response.data.name;
          this.email = response.data.email;
          this.phone = response.data.phone;
          this.image = response.data.image;
        })
        .catch(() => {
          alert("Usuário não encontrado");
        });
    },
    updateUser() {
      var file = this.$refs.file.files[0];
      var form = "";
      form = new FormData();
      form.append("name", this.name);
      form.append("email", this.email);
      form.append("password", this.password);
      form.append("phone", this.phone);

      if(file != undefined) {
        console.log(1234);
        form.append("image", file);
      } else {
        console.log(7894);
        form.append("image", null);
      }
      
      this.$http.post(`users/${this.$route.params.usuario}`, form).then((response) => {
        alert(`Usuário ${response.data.id} atualizado com sucesso`)
        window.location.reload()
      })
      .catch(() => {
         alert('Dados inválidos')
      })
    },
  },
  created() {
    this.getUser();
  },
};
</script>


<style>
</style>
