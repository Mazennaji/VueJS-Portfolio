<template>
  <div :class="{ dark: isDark }">
    <Navbar :isDark="isDark" @toggle-dark="toggleDark" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from "vue"
import Navbar from "./components/Navbar.vue"

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
}
</script>

<style>
:root {
  --bg: #ffffff;
  --text: #222222;
  --card-bg: #f5f5f5;
  --card-text: #222222;
}

.dark {
  --bg: #121212;
  --text: #f5f5f5;
  --card-bg: #1e1e1e;
  --card-text: #f5f5f5;
}

body, html, #app, div {
  background: var(--bg);
  color: var(--text);
  transition: all 0.3s;
  font-family: 'Arial', sans-serif;
}
</style>
