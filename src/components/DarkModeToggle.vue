<template>
  <button class="toggle" @click="toggle" :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'">
    <div class="track">
      <div class="icons">
        <svg class="icon sun-icon" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.5"/>
          <g stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <line x1="12" y1="2.5" x2="12" y2="4.5"/>
            <line x1="12" y1="19.5" x2="12" y2="21.5"/>
            <line x1="2.5" y1="12" x2="4.5" y2="12"/>
            <line x1="19.5" y1="12" x2="21.5" y2="12"/>
            <line x1="5.6" y1="5.6" x2="7" y2="7"/>
            <line x1="17" y1="17" x2="18.4" y2="18.4"/>
            <line x1="18.4" y1="5.6" x2="17" y2="7"/>
            <line x1="7" y1="17" x2="5.6" y2="18.4"/>
          </g>
        </svg>
        <svg class="icon moon-icon" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="thumb" :class="{ active: darkMode }"></div>
    </div>
  </button>
</template>

<script setup>
import { ref } from "vue"

const darkMode = ref(false)

function toggle() {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle("dark", darkMode.value)
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap");

.toggle {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
}

.track {
  position: relative;
  width: 64px;
  height: 32px;
  border-radius: 999px;
  background: #1a1a1f;
  border: 1px solid #2a2a32;
  transition: background 0.4s ease, border-color 0.4s ease;
  overflow: hidden;
}

.toggle:focus-visible .track {
  box-shadow: 0 0 0 2px #c9a96e;
}

.dark .track {
  background: #f0ebe2;
  border-color: #d4cfc6;
}

.icons {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  pointer-events: none;
}

.icon {
  width: 13px;
  height: 13px;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.sun-icon {
  color: #c9a96e;
  opacity: 1;
}

.moon-icon {
  color: #6e6a64;
  opacity: 0.5;
}

.dark .sun-icon {
  color: #c9a96e;
  opacity: 0.4;
}

.dark .moon-icon {
  color: #0b0b0e;
  opacity: 1;
}

.thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #c9a96e;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              background 0.4s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.thumb.active {
  transform: translateX(32px);
  background: #0b0b0e;
}

.toggle:hover .thumb {
  box-shadow: 0 1px 8px rgba(201, 169, 110, 0.4);
}
</style>