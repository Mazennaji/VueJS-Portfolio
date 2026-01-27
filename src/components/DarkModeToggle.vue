<template>
  <button class="dark-toggle-btn" @click="toggle">
    <span :class="{ sun: !darkMode, moon: darkMode }"></span>
  </button>
</template>

<script setup>
import { ref } from "vue"

const darkMode = ref(false)

function toggle() {
  darkMode.value = !darkMode.value
  if (darkMode.value) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}
</script>

<style scoped>
.dark-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: all 0.4s ease;
  z-index: 1000;
}

.dark .dark-toggle-btn {
  background: linear-gradient(135deg, #222, #444);
}

.dark-toggle-btn span {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffd700; /* sun color */
  position: relative;
  transition: all 0.5s ease;
}

/* Sun rays */
.dark-toggle-btn span.sun::before,
.dark-toggle-btn span.sun::after {
  content: '';
  position: absolute;
  background: #ffd700;
  border-radius: 2px;
  transition: all 0.5s ease;
}

.dark-toggle-btn span.sun::before {
  width: 2px;
  height: 12px;
  top: -6px;
  left: 11px;
}

.dark-toggle-btn span.sun::after {
  width: 12px;
  height: 2px;
  top: 11px;
  left: -6px;
}

/* Moon style */
.dark-toggle-btn span.moon {
  background: #f0f0f0;
  box-shadow: -6px -6px 0 #121212 inset;
  transform: rotate(0deg);
}

</style>
