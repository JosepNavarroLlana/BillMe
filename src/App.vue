<template>
  <div>
    <header>
      <h1>BillMe</h1>
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/listado">Lista de Movimientos</router-link>
        <router-link to="/movimiento">Añadir Movimientos</router-link>
        <router-link to="/editar">Editar</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>


<style scoped>
header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightgreen;
  padding: 15px 0;
}

header h1 {
  margin: 0;
  padding-left: 20px;
  color: white;
  font-size: 2em;
  text-align: left;
}

nav {
  display: flex;
  gap: 5px;
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  margin-right: 20px;
}

nav a:hover {
  background: rgba(253, 253, 253, 0.2);
}
</style>