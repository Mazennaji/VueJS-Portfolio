<template>
  <Transition name="preloader">
    <div v-if="visible" class="preloader">
      <div class="pre-inner">
        <span class="pre-wordmark">John Doe</span>
        <div class="pre-bar-track">
          <div class="pre-bar" :style="`--w: ${progress}%`" />
        </div>
        <span class="pre-num">{{ Math.round(progress) }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue"

const visible  = ref(true)
const progress = ref(0)

onMounted(() => {
  const start = performance.now()
  const duration = 1800

  function tick(now) {
    const elapsed = now - start
    progress.value = Math.min((elapsed / duration) * 100, 100)
    if (progress.value < 100) {
      requestAnimationFrame(tick)
    } else {
      setTimeout(() => { visible.value = false }, 300)
    }
  }
  requestAnimationFrame(tick)
})
</script>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  background: var(--bg-base);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pre-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 220px;
}

.pre-wordmark {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  animation: fade-in 0.4s ease both;
}

.pre-bar-track {
  width: 100%;
  height: 1px;
  background: var(--border-subtle);
  overflow: hidden;
}

.pre-bar {
  height: 100%;
  width: var(--w);
  background: var(--gold);
  transform-origin: left;
  transition: width 0.05s linear;
}

.pre-num {
  font-family: var(--font-serif);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-faint);
  letter-spacing: 0.1em;
  min-width: 32px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.preloader-leave-active {
  transition: opacity 0.5s ease, transform 0.5s var(--ease-out-expo);
}
.preloader-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>