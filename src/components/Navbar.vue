<template>
  <nav>
    <h2>John Doe</h2>

    <!-- Dark Mode Toggle -->
    <button class="dark-toggle" @click="$emit('toggle-dark')">
      {{ isDark ? '☀️ Light' : '🌙 Dark' }}
    </button>

    <!-- Burger Menu for Mobile -->
    <button class="burger" @click="toggleMenu">☰</button>

    <!-- Menu Links -->
    <div class="menu" :class="{ open: openMenu }">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, defineProps } from "vue"

const openMenu = ref(false)
function toggleMenu() { openMenu.value = !openMenu.value }

defineProps({
  isDark: Boolean
})
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  position: relative;
  background: var(--bg);
  color: var(--text);
  transition: all 0.3s;
}

h2 {
  margin: 0;
}

/* Dark mode toggle */
.dark-toggle {
  margin-right: 15px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text);
}

/* Burger button */
.burger {
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--text);
}

/* Menu links */
.menu {
  display: flex;
  gap: 20px;
  transition: all 0.3s;
}

.menu.open {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 20px;
  background: var(--bg);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Links style */
a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
}

a:hover {
  color: #1e90ff;
}

/* Responsive */
@media (max-width: 768px) {
  .burger { display: block }
  .menu { display: none }
}
</style>
