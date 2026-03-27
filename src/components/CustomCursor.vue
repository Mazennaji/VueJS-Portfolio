<template>
  <div class="cursor-dot"   ref="dot" />
  <div class="cursor-ring"  ref="ring" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const dot  = ref(null)
const ring = ref(null)

let mouse = { x: 0, y: 0 }
let pos   = { x: 0, y: 0 }
let raf

function onMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
  dot.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
}

function loop() {
  pos.x += (mouse.x - pos.x) * 0.12
  pos.y += (mouse.y - pos.y) * 0.12
  ring.value.style.transform = `translate(${pos.x}px, ${pos.y}px)`
  raf = requestAnimationFrame(loop)
}

function onEnterLink() { ring.value.classList.add("expand") }
function onLeaveLink() { ring.value.classList.remove("expand") }

onMounted(() => {
  window.addEventListener("mousemove", onMove)
  document.querySelectorAll("a, button, .card, .filter-btn").forEach(el => {
    el.addEventListener("mouseenter", onEnterLink)
    el.addEventListener("mouseleave", onLeaveLink)
  })
  loop()
})

onUnmounted(() => {
  window.removeEventListener("mousemove", onMove)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
}

.cursor-dot {
  width: 5px;
  height: 5px;
  background: var(--gold);
  border-radius: 50%;
  margin-left: -2.5px;
  margin-top: -2.5px;
  transition: opacity 0.3s ease;
}

.cursor-ring {
  width: 32px;
  height: 32px;
  border: 1px solid color-mix(in srgb, var(--gold) 50%, transparent);
  border-radius: 50%;
  margin-left: -16px;
  margin-top: -16px;
  transition: width 0.3s var(--ease-spring),
              height 0.3s var(--ease-spring),
              border-color 0.3s ease,
              margin 0.3s var(--ease-spring);
}

.cursor-ring.expand {
  width: 52px;
  height: 52px;
  margin-left: -26px;
  margin-top: -26px;
  border-color: var(--gold);
}

@media (hover: none) {
  .cursor-dot, .cursor-ring { display: none; }
}
</style>