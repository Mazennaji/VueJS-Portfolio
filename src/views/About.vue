<script setup>
import { onMounted, ref } from "vue"

const isDark = ref(document.documentElement.classList.contains("dark"))

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark")
})

onMounted(() => {
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })

  const cards = document.querySelectorAll(".skill-card")
  const bars  = document.querySelectorAll(".skill-bar-fill")

  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show") })
  }, { threshold: 0.15 })

  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("grow") })
  }, { threshold: 0.3 })

  cards.forEach(c => cardObs.observe(c))
  bars.forEach(b => barObs.observe(b))
})

const skills = [
  { name: "HTML5",      level: "95%", colorDark: "#E34F26", colorLight: "#E34F26", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/html5.svg" },
  { name: "CSS3",       level: "90%", colorDark: "#1572B6", colorLight: "#1572B6", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/css3.svg" },
  { name: "JavaScript", level: "85%", colorDark: "#F7DF1E", colorLight: "#c9a800", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/javascript.svg" },
  { name: "TypeScript", level: "80%", colorDark: "#3178C6", colorLight: "#3178C6", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/typescript.svg" },
  { name: "Vue.js",     level: "90%", colorDark: "#4FC08D", colorLight: "#368a62", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/vuedotjs.svg" },
  { name: "React",      level: "85%", colorDark: "#61DAFB", colorLight: "#0a9bb5", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/react.svg" },
  { name: "Vite",      level: "80%", colorDark: "#646CFF", colorLight: "#646CFF", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/vite.svg" },
  { name: "Svelte",     level: "70%", colorDark: "#FF3E00", colorLight: "#FF3E00", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/svelte.svg" },
  { name: "Tailwind",   level: "80%", colorDark: "#06B6D4", colorLight: "#0284a0", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/tailwindcss.svg" },
  { name: "Bootstrap",  level: "80%", colorDark: "#7952B3", colorLight: "#7952B3", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/bootstrap.svg" },
  { name: "Git",        level: "75%", colorDark: "#F05032", colorLight: "#F05032", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/git.svg" },
  { name: "GitHub",     level: "80%", colorDark: "#F1F1F1", colorLight: "#1a1a1a", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/github.svg" },
  { name: "Angular",    level: "70%", colorDark: "#DD0031", colorLight: "#DD0031", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/angular.svg" },
  { name: "Grunt",      level: "60%", colorDark: "#FAA918", colorLight: "#c47d00", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/grunt.svg" },
  { name: "Next.js",      level: "80%", colorDark: "#f8f8f8", colorLight: "#1a1a1a", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/nextdotjs.svg" },
  { name: "Nuxt.js",      level: "80%", colorDark: "#f8f8f8", colorLight: "#1a1a1a", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/nuxtdotjs.svg" },
]
</script>

<template>
  <section class="about">
    <div class="container">

      <aside class="sidebar">
        <div class="profile-wrap">
          <img src="/profile.png" alt="Profile" class="profile-img" />
          <div class="profile-glow" />
        </div>
        <div class="profile-meta">
          <span class="availability">
            <span class="dot" />Available for work
          </span>
          <p class="location">Based in — Worldwide</p>
        </div>
      </aside>

      <div class="content">
        <header class="content-header">
          <span class="overline">Who I am</span>
          <h1>About <em>Me</em></h1>
          <div class="header-line" />
        </header>

        <p class="bio">
          Passionate frontend developer building modern, responsive web interfaces.
          I care about every pixel, every transition, and every detail that makes
          an experience feel considered.
        </p>

        <div class="skills-section">
          <span class="overline">Skills &amp; Technologies</span>

          <div class="skills-grid">
            <div
              v-for="(s, i) in skills"
              :key="s.name"
              class="skill-card"
              :style="`--i: ${i}`"
            >
              <div class="skill-icon-wrap">
                <span
                  class="skill-icon"
                  :style="`--mask: url('${s.logo}'); --brand: ${isDark ? s.colorDark : s.colorLight}`"
                />
              </div>
              <div class="skill-info">
                <span class="skill-name">{{ s.name }}</span>
                <span class="skill-level">{{ s.level }}</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" :style="`--pct: ${s.level}`" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about {
  min-height: 100vh;
  background: var(--bg-base);
  padding: 80px 48px 100px;
  font-family: var(--font-sans);
  color: var(--text-primary);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 80px;
  align-items: start;
}

.sidebar {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.profile-wrap {
  position: relative;
  width: 220px;
}

.profile-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
  filter: grayscale(20%) brightness(0.9);
  transition: filter 0.5s ease;
}

.profile-img:hover {
  filter: grayscale(0%) brightness(1);
}

.profile-glow {
  position: absolute;
  inset: -1px;
  border: 1px solid var(--border-mid);
  pointer-events: none;
}

.profile-glow::after {
  content: "";
  position: absolute;
  bottom: -12px;
  left: -12px;
  right: 12px;
  top: 12px;
  border: 1px solid var(--border-subtle);
  z-index: -1;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a9e6a;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7a9e6a;
  animation: pulse 2.4s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

.location {
  font-size: 12px;
  font-weight: 300;
  color: var(--text-faint);
  margin: 0;
  letter-spacing: 0.04em;
}

.content-header {
  margin-bottom: 32px;
}

.overline {
  display: block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

h1 {
  font-family: var(--font-serif);
  font-size: clamp(52px, 6vw, 84px);
  font-weight: 700;
  line-height: 0.9;
  color: var(--text-primary);
  margin: 0 0 24px;
  letter-spacing: -0.02em;
}

h1 em {
  font-style: italic;
  color: var(--gold);
}

.header-line {
  width: 48px;
  height: 2px;
  background: var(--gold);
}

.bio {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.85;
  color: var(--text-muted);
  max-width: 540px;
  margin: 0 0 56px;
}

.skills-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.skill-card {
  display: grid;
  grid-template-columns: 44px 1fr 120px;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background: var(--bg-surface);
  border-left: 2px solid transparent;
  opacity: 0;
  transform: translateX(-16px);
  transition:
    opacity 0.5s ease calc(var(--i) * 45ms),
    transform 0.5s var(--ease-out-expo) calc(var(--i) * 45ms),
    border-color 0.3s ease,
    background 0.3s ease;
}

.skill-card.show {
  opacity: 1;
  transform: translateX(0);
}

.skill-card:hover {
  background: var(--bg-raised);
  border-left-color: var(--gold);
}

.skill-icon-wrap {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.skill-card:hover .skill-icon-wrap {
  opacity: 1;
}

.skill-icon {
  display: block;
  width: 20px;
  height: 20px;
  background-color: var(--brand);
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  transition: background-color 0.4s ease;
}

.skill-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.skill-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 0.02em;
}

.skill-level {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-faint);
  letter-spacing: 0.05em;
}

.skill-bar-track {
  height: 2px;
  background: var(--border-subtle);
  border-radius: 1px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  width: var(--pct);
  background: var(--gold);
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--ease-out-expo);
}

.skill-bar-fill.grow {
  transform: scaleX(1);
}

@media (max-width: 800px) {
  .about { padding: 60px 24px 80px; }
  .container {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .sidebar {
    position: static;
    flex-direction: row;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  .profile-wrap { width: 140px; }
  .skill-card { grid-template-columns: 36px 1fr 80px; }
}
</style>