import { onMounted, onUnmounted } from "vue"

export function useMagnetic(elRef, strength = 0.35) {
  let bounds

  function onMove(e) {
    const el = elRef.value
    if (!el) return
    bounds = el.getBoundingClientRect()
    const cx = bounds.left + bounds.width  / 2
    const cy = bounds.top  + bounds.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  function onLeave() {
    const el = elRef.value
    if (!el) return
    el.style.transform = "translate(0px, 0px)"
  }

  onMounted(() => {
    const el = elRef.value
    if (!el) return
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    el.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
    el.style.display = "inline-flex"
  })

  onUnmounted(() => {
    const el = elRef.value
    if (!el) return
    el.removeEventListener("mousemove", onMove)
    el.removeEventListener("mouseleave", onLeave)
  })
}