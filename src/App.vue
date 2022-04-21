<template>
  <div id="app">
    <nav>
      <h2>
        <router-link to="/">Listagem</router-link>
      </h2>
    </nav>
    <router-view />
  </div>
</template>

<script>
  export default {
    
    created() {
      this.$http.get('/users/ping').then((response) => {
        console.log(response);
      })
    }
  }
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #000000;
}
</style>
