<script setup></script>

<template>
  <header>
    <div class="wrapper">HEADER</div>
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/login">Giriş</router-link> |
      <router-link to="/register">Kayıt olmak</router-link>
      <router-view />
    </div>
  </header>

  <main></main>

  <footer>FOOTER</footer>
</template>
