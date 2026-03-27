<script setup>
import { onMounted, onUnmounted, ref } from "vue"

const isDark = ref(document.documentElement.classList.contains("dark"))

let mo
onMounted(() => {
  mo = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains("dark")
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

  const cards = document.querySelectorAll(".card")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  cards.forEach((card) => observer.observe(card))
})

onUnmounted(() => mo?.disconnect())

const projects = [
  { title: "Landing Page", desc: "Responsive landing page", img: "/landingpage.png", tag: "Web Design" },
  { title: "Dashboard UI", desc: "Admin dashboard",        img: "/dashboard.png",    tag: "UI/UX" },
  { title: "Portfolio",    desc: "Vue portfolio site",     img: "/portfolio.png",    tag: "Development" },
]
</script>

<template>
  <section class="projects" :class="{ light: !isDark }">
    <header class="projects-header">
      <span class="overline">Selected Work</span>
      <h1>Projects</h1>
      <div class="header-line" />
    </header>

    <div class="grid">
      <article
        v-for="(p, i) in projects"
        :key="p.title"
        class="card"
        :style="`--delay: ${i * 120}ms`"
      >
        <div class="card-media">
          <img :src="p.img" :alt="p.title" class="project-img" />
          <div class="card-overlay" />
        </div>
        <div class="card-body">
          <span class="tag">{{ p.tag }}</span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.desc }}</p>
          <div class="card-footer">
            <span class="view-link">View Project <span class="arrow">→</span></span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.projects {
  min-height: 100vh;
  background: var(--bg-base);
  padding: 80px 60px 100px;
  font-family: var(--font-sans);
  color: var(--text-primary);
  transition: background 0.4s ease, color 0.4s ease;
}

.projects-header { margin-bottom: 64px; }

.overline {
  display: block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 12px;
  transition: color 0.4s ease;
}

h1 {
  font-family: var(--font-serif);
  font-size: clamp(52px, 8vw, 96px);
  font-weight: 700;
  line-height: 0.9;
  color: var(--text-primary);
  margin: 0 0 28px;
  letter-spacing: -0.02em;
  transition: color 0.4s ease;
}

.header-line {
  width: 48px;
  height: 2px;
  background: var(--gold);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2px;
}

.card {
  background: var(--bg-surface);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.7s ease var(--delay, 0ms),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms),
    background 0.4s ease;
}

.card.show {
  opacity: 1;
  transform: translateY(0);
}

.card-media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-raised);
  transition: background 0.4s ease;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  filter: brightness(0.85) saturate(0.9);
}

.light .project-img {
  filter: brightness(0.95) saturate(0.95);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(var(--bg-base-rgb, 11, 11, 14), 0.6) 100%
  );
  transition: opacity 0.4s ease;
}

.light .card-overlay {
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(240, 235, 226, 0.5) 100%
  );
}

.card:hover .project-img  { transform: scale(1.06); }
.card:hover .card-overlay { opacity: 0.7; }

.card-body {
  padding: 28px 28px 32px;
  border-top: 1px solid var(--border-subtle);
  position: relative;
  transition: border-color 0.4s ease;
}

.card-body::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover .card-body::before { transform: scaleX(1); }

.tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}

.card-body h3 {
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
  letter-spacing: -0.01em;
  line-height: 1.15;
  transition: color 0.4s ease;
}

.card-body p {
  font-size: 13.5px;
  font-weight: 300;
  color: var(--text-muted);
  margin: 0 0 20px;
  line-height: 1.6;
  transition: color 0.4s ease;
}

.view-link {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.arrow {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover .view-link  { color: var(--gold); }
.card:hover .arrow      { transform: translateX(5px); }
</style>