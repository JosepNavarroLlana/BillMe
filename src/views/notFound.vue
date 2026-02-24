<template>
  <div class="not-found">
    <h1 class="error-code">404</h1>
    <h2 class="error-message">Página no encontrada</h2>
    <p class="error-description">La página que buscas no existe o ha sido movida.</p>
    <router-link to="/" class="home-button">Volver al inicio</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f9f9f9;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: #90EE90;
  margin: 0;
}

.error-message {
  font-size: 2rem;
  color: #333;
  margin: 10px 0;
}

.error-description {
  font-size: 1rem;
  color: #777;
  margin-bottom: 30px;
}

.home-button {
  padding: 12px 24px;
  background-color: #90EE90;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #7CFC00;
}
</style>