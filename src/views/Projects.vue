<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"

const isDark = ref(document.documentElement.classList.contains("dark"))

let mo
onMounted(() => {
  mo = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains("dark")
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
})
onUnmounted(() => mo?.disconnect())

const projects = [
  { title: "Landing Page",   desc: "Responsive landing page",  img: "/landingpage.png", tag: "Web Design"  },
  { title: "Dashboard UI",   desc: "Admin dashboard",          img: "/dashboard.png",   tag: "UI/UX"       },
  { title: "Portfolio",      desc: "Vue portfolio site",       img: "/portfolio.png",   tag: "Development" },
  { title: "E-commerce UI",  desc: "Product listing page",     img: "/ecommerce.png",   tag: "Web Design"  },
  { title: "Analytics App",  desc: "Data visualization tool",  img: "/analytics.png",   tag: "UI/UX"       },
  { title: "Component Lib",  desc: "Reusable Vue components",  img: "/components.png",  tag: "Development" },
]

const tags    = ["All", ...new Set(projects.map(p => p.tag))]
const active  = ref("All")

const filtered = computed(() =>
  active.value === "All" ? projects : projects.filter(p => p.tag === active.value)
)

function setFilter(tag) {
  active.value = tag
}
</script>

<template>
  <section class="projects" :class="{ light: !isDark }">
    <header class="projects-header">
      <span class="overline">Selected Work</span>
      <h1>Pro<em>jects</em></h1>
      <div class="header-line" />
    </header>

    <div class="filters">
      <button
        v-for="tag in tags"
        :key="tag"
        class="filter-btn"
        :class="{ active: active === tag }"
        @click="setFilter(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <Transition name="grid-fade" mode="out-in">
      <div class="grid" :key="active">
        <article
          v-for="(p, i) in filtered"
          :key="p.title"
          class="card show"
          :style="`--delay: ${i * 80}ms`"
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
    </Transition>
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

.projects-header { margin-bottom: 48px; }

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

h1 em {
  font-style: italic;
  color: var(--gold);
}

.header-line {
  width: 48px;
  height: 2px;
  background: var(--gold);
}

.filters {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 9px 20px;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.filter-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-mid);
}

.filter-btn.active {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--bg-base);
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
  transform: translateY(24px);
  animation: card-in 0.5s var(--ease-out-expo) var(--delay, 0ms) forwards;
  transition: background 0.4s ease;
}

.card.show {
  opacity: 1;
  transform: translateY(0);
}

@keyframes card-in {
  to { opacity: 1; transform: translateY(0); }
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
  background: linear-gradient(to bottom, transparent 40%, rgba(11, 11, 14, 0.6) 100%);
  transition: opacity 0.4s ease;
}

.light .card-overlay {
  background: linear-gradient(to bottom, transparent 40%, rgba(240, 235, 226, 0.5) 100%);
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

.grid-fade-enter-active { transition: opacity 0.25s ease, transform 0.3s var(--ease-out-expo); }
.grid-fade-leave-active { transition: opacity 0.2s ease; }
.grid-fade-enter-from   { opacity: 0; transform: translateY(8px); }
.grid-fade-leave-to     { opacity: 0; }

@media (max-width: 768px) {
  .projects { padding: 60px 24px 80px; }
}
</style>