<template>
  <nav>
    <h2>John Doe</h2>
    <button class="burger" @click="toggleMenu">☰</button>
    <div :class="{ open: openMenu }">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue"
const openMenu = ref(false)
function toggleMenu() { openMenu.value = !openMenu.value }
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  position: relative;
}
.burger {
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
}
div {
  display: flex;
  gap: 20px;
}
div.open {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 20px;
  background: var(--bg);
  padding: 10px;
}
@media (max-width: 768px){
  .burger { display: block }
  div { display: none }
}
</style>
