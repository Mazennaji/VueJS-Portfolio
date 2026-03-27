<template>
  <Transition name="btt">
    <button v-if="visible" class="btt" @click="scrollTop" aria-label="Back to top">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const visible = ref(false)

function onScroll() { visible.value = window.scrollY > 400 }
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }) }

onMounted(()  => window.addEventListener("scroll", onScroll))
onUnmounted(() => window.removeEventListener("scroll", onScroll))
</script>

<style scoped>
.btt {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  background: var(--bg-surface);
  border: 1px solid var(--border-mid);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 500;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.btt:hover {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--bg-base);
}

.btt svg {
  width: 16px;
  height: 16px;
}

.btt-enter-active { transition: opacity 0.3s ease, transform 0.3s var(--ease-spring); }
.btt-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.btt-enter-from, .btt-leave-to { opacity: 0; transform: translateY(8px); }
</style>