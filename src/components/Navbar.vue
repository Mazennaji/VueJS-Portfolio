<template>
  <nav>
    <h2>John Doe</h2>

    <!-- Dark Mode Toggle -->
    <button class="dark-toggle" @click="$emit('toggle-dark')">
      {{ isDark ? '☀️ Light' : '🌙 Dark' }}
    </button>

    <!-- Burger Menu -->
    <button class="burger" @click="toggleMenu">
      <span :class="{ open: openMenu }"></span>
      <span :class="{ open: openMenu }"></span>
      <span :class="{ open: openMenu }"></span>
    </button>

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
  background: var(--bg);
  color: var(--text);
  position: relative;
  transition: all 0.3s;
  z-index: 100;
}

h2 { margin: 0; }

.dark-toggle {
  margin-right: 15px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text);
}

/* Burger Button */
.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 22px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
}

.burger span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.4s ease;
}

.burger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger span.open:nth-child(2) {
  opacity: 0;
}

.burger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
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
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* Links */
a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.3s;
}

a:hover { color: #1e90ff; }

/* Responsive */
@media (max-width: 768px) {
  .burger { display: flex; }
  .menu { display: none; }
}

/* Dark mode burger color */
.dark .burger span {
  background: #f5f5f5;
}
</style>
