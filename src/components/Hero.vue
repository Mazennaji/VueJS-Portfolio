<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const isDark = ref(document.documentElement.classList.contains("dark"))
let mo

const titles  = ["Frontend Developer", "Vue Engineer", "UI Developer", "Design-to-Code Dev"]
const current = ref(titles[0])
let  idx      = 0
let  charIdx  = 0
let  deleting = false
let  timer

function type() {
  const target = titles[idx]
  if (!deleting) {
    current.value = target.slice(0, ++charIdx)
    if (charIdx === target.length) {
      deleting = true
      timer = setTimeout(type, 1800)
      return
    }
  } else {
    current.value = target.slice(0, --charIdx)
    if (charIdx === 0) {
      deleting = false
      idx = (idx + 1) % titles.length
    }
  }
  timer = setTimeout(type, deleting ? 45 : 85)
}

const stats = [
  { value: "5+",  label: "Years experience" },
  { value: "30+", label: "Projects delivered" },
  { value: "15",  label: "Happy clients" },
  { value: "∞",   label: "Cups of coffee" },
]

onMounted(() => {
  mo = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains("dark")
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

  timer = setTimeout(type, 2000)

  const hero = document.querySelector(".hero")
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect()
    hero.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`)
    hero.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`)
  })
})

onUnmounted(() => {
  mo?.disconnect()
  clearTimeout(timer)
})
</script>

<template>
  <section class="hero" :class="{ light: !isDark }">
    <div class="noise" />
    <div class="spotlight" />

    <div class="content">
      <span class="label">Available for work</span>

      <h1>
        <span class="line">Frontend</span>
        <span class="line accent">{{ current }}<span class="cursor">|</span></span>
      </h1>

      <p>Building clean and modern web interfaces with Vue.</p>

      <div class="actions">
        <router-link to="/projects" class="btn-primary">
          View Projects <span class="btn-arrow">→</span>
        </router-link>
        <router-link to="/contact" class="btn-ghost">Get in touch</router-link>
      </div>
    </div>

    <div class="stats">
      <div v-for="s in stats" :key="s.label" class="stat">
        <span class="stat-value">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>

    <div class="scroll-hint">
      <span class="scroll-line" />
      <span class="scroll-text">Scroll</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --mx: 50%;
  --my: 40%;
  position: relative;
  min-height: 100vh;
  background: var(--bg-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: var(--font-sans);
  color: var(--text-primary);
  transition: background 0.4s ease, color 0.4s ease;
}

.noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 0;
}

.spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(600px circle at var(--mx) var(--my), rgba(201,169,110,0.07), transparent 60%);
  pointer-events: none;
  z-index: 1;
}

.light .spotlight {
  background: radial-gradient(600px circle at var(--mx) var(--my), rgba(180,130,60,0.06), transparent 60%);
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 24px;
  max-width: 780px;
}

.label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 28px;
  animation: fade-up 0.8s ease both;
}

.label::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
  animation: pulse 2.4s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.7); }
}

h1 {
  display: flex;
  flex-direction: column;
  font-family: var(--font-serif);
  font-size: clamp(48px, 10vw, 120px);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin: 0 0 32px;
  color: var(--text-primary);
  transition: color 0.4s ease;
  min-height: 2.2em;
}

.line {
  display: block;
  animation: fade-up 0.8s ease both;
}

.line:nth-child(2) { animation-delay: 0.1s; }

.accent {
  font-style: italic;
  color: var(--gold);
}

.cursor {
  display: inline-block;
  color: var(--gold);
  opacity: 1;
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

p {
  font-size: 16px;
  font-weight: 300;
  color: var(--text-muted);
  letter-spacing: 0.01em;
  line-height: 1.7;
  margin: 0 0 48px;
  animation: fade-up 0.8s ease 0.2s both;
  transition: color 0.4s ease;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  animation: fade-up 0.8s ease 0.3s both;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: var(--gold);
  color: var(--bg-base);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s ease, gap 0.3s var(--ease-spring);
}

.btn-primary:hover { background: var(--gold-hi); gap: 16px; }

.btn-arrow { transition: transform 0.3s var(--ease-spring); }
.btn-primary:hover .btn-arrow { transform: translateX(3px); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  border: 1px solid var(--border-mid);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

.stats {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 80px;
  border: 1px solid var(--border-subtle);
  animation: fade-up 0.8s ease 0.5s both;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  border-right: 1px solid var(--border-subtle);
  transition: background 0.3s ease;
}

.stat:last-child { border-right: none; }
.stat:hover { background: var(--bg-surface); }

.stat-value {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-top: 6px;
  transition: color 0.4s ease;
  white-space: nowrap;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 2;
  animation: fade-up 0.8s ease 0.6s both;
}

.scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, transparent, var(--gold));
  animation: grow-line 1.8s ease 1.2s infinite;
  transform-origin: top;
}

@keyframes grow-line {
  0%   { transform: scaleY(0); opacity: 0; }
  30%  { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0; }
}

.scroll-text {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-faint);
  transition: color 0.4s ease;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .stats { flex-wrap: wrap; }
  .stat  { padding: 16px 24px; flex: 1 1 40%; }
  .stat:nth-child(2) { border-right: none; }
}
</style>