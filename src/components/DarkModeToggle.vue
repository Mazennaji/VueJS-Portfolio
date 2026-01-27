<template>
  <button @click="toggle" class="dark-btn">
    {{ darkMode ? "Light Mode" : "Dark Mode" }}
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
.dark-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  cursor: pointer;
}
</style>
