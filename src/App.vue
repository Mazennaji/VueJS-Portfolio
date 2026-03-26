<template>
  <div class="app-root" :class="{ dark: isDark }">
    <Navbar :isDark="isDark" @toggle-dark="toggleDark" />
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import Navbar from "./components/Navbar.vue"

const isDark = ref(
  window.matchMedia("(prefers-color-scheme: dark)").matches
)

function toggleDark() {
  isDark.value = !isDark.value
}

watch(isDark, (val) => {
  document.documentElement.classList.toggle("dark", val)
}, { immediate: true })
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap");

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --gold:    #c9a96e;
  --gold-hi: #d9bc88;

  --bg-base:    #0b0b0e;
  --bg-surface: #111115;
  --bg-raised:  #16161b;

  --border-subtle: #1e1e24;
  --border-mid:    #2a2a32;

  --text-primary:   #f0ebe2;
  --text-secondary: #9a8c78;
  --text-muted:     #6e6a64;
  --text-faint:     #4a4640;

  --font-serif: "Cormorant Garamond", serif;
  --font-sans:  "DM Sans", sans-serif;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

html, body {
  min-height: 100%;
}

body {
  font-family: var(--font-sans);
  background: var(--bg-base);
  color: var(--text-primary);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
  color: var(--text-primary);
  transition: background 0.4s ease, color 0.4s ease;
}

.app-main {
  flex: 1;
  padding-top: 68px;
}

::selection {
  background: var(--gold);
  color: var(--bg-base);
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: var(--bg-base);
}

::-webkit-scrollbar-thumb {
  background: var(--border-mid);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gold);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

button {
  font-family: var(--font-sans);
}

.page-enter-active {
  transition: opacity 0.35s ease, transform 0.4s var(--ease-out-expo);
}

.page-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>