<template>
  <div class="pt-wrapper">
    <div class="pt-bar" ref="bar" />
    <slot />
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

const bar   = ref(null)
const route = useRoute()

watch(() => route.path, async () => {
  const el = bar.value
  if (!el) return

  el.style.transition = "none"
  el.style.transform  = "scaleX(0)"
  el.style.transformOrigin = "left"
  el.style.opacity = "1"

  await nextTick()
  el.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
  el.style.transform  = "scaleX(1)"

  setTimeout(() => {
    el.style.transformOrigin = "right"
    el.style.transition = "transform 0.3s ease"
    el.style.transform  = "scaleX(0)"
  }, 380)
})

import { nextTick } from "vue"
</script>

<style scoped>
.pt-wrapper {
  position: relative;
}

.pt-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  z-index: 9998;
  pointer-events: none;
}
</style>