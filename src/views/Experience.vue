<template>
  <section class="experience">
    <header class="exp-header">
      <span class="overline">Where I've been</span>
      <h1>Experi<em>ence</em></h1>
      <div class="header-line" />
    </header>

    <div class="timeline">
      <div
        v-for="(item, i) in timeline"
        :key="i"
        class="entry"
        :style="`--i: ${i}`"
      >
        <div class="entry-aside">
          <span class="entry-date">{{ item.period }}</span>
        </div>

        <div class="entry-connector">
          <div class="connector-dot" />
          <div class="connector-line" v-if="i < timeline.length - 1" />
        </div>

        <div class="entry-body">
          <div class="entry-header">
            <div>
              <h3>{{ item.role }}</h3>
              <span class="company">
                <a v-if="item.url" :href="item.url" target="_blank" rel="noopener">
                  {{ item.company }}
                </a>
                <template v-else>{{ item.company }}</template>
                <span class="location"> — {{ item.location }}</span>
              </span>
            </div>
            <span class="badge" :class="item.type">{{ item.type }}</span>
          </div>

          <p>{{ item.desc }}</p>

          <div class="tags">
            <span v-for="t in item.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="resume-strip">
      <span class="overline">Want the full picture?</span>
      <a href="/resume.pdf" download class="btn-primary">
        Download Resume
        <svg viewBox="0 0 24 24" fill="none" class="dl-icon">
          <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 21h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue"

const timeline = [
  {
    period:   "2023 — Present",
    role:     "Senior Frontend Developer",
    company:  "Acme Studio",
    location: "Remote",
    url:      "https://acme.com",
    type:     "Full-time",
    desc:     "Leading the frontend architecture for a SaaS dashboard serving 50k+ users. Introduced a Vue 3 component library, cutting design-to-dev handoff time by 40%.",
    tags:     ["Vue 3", "TypeScript", "Design Systems", "Vite"],
  },
  {
    period:   "2021 — 2023",
    role:     "Frontend Developer",
    company:  "Bright Agency",
    location: "Beirut, LB",
    url:      null,
    type:     "Full-time",
    desc:     "Built and maintained marketing sites and web apps for 15+ clients across e-commerce, fintech, and media verticals.",
    tags:     ["Vue 2", "Nuxt", "Tailwind CSS", "GSAP"],
  },
  {
    period:   "2020 — 2021",
    role:     "UI Developer",
    company:  "Freelance",
    location: "Worldwide",
    url:      null,
    type:     "Freelance",
    desc:     "Delivered pixel-perfect interfaces for early-stage startups, primarily converting Figma designs into React and Vue applications.",
    tags:     ["React", "Vue", "Figma", "CSS Animation"],
  },
  {
    period:   "2018 — 2020",
    role:     "Junior Web Developer",
    company:  "Tech Collective",
    location: "Beirut, LB",
    url:      null,
    type:     "Full-time",
    desc:     "Started my career building responsive marketing pages and internal tools. First exposure to component-driven development.",
    tags:     ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
]

onMounted(() => {
  const entries = document.querySelectorAll(".entry")
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show") })
  }, { threshold: 0.1 })
  entries.forEach(e => obs.observe(e))
})
</script>

<style scoped>
.experience {
  min-height: 100vh;
  background: var(--bg-base);
  padding: 80px 60px 100px;
  font-family: var(--font-sans);
  color: var(--text-primary);
  transition: background 0.4s ease, color 0.4s ease;
}

.exp-header { margin-bottom: 72px; }

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

.timeline {
  max-width: 860px;
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
}

.entry {
  display: grid;
  grid-template-columns: 140px 32px 1fr;
  gap: 0 24px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease calc(var(--i) * 100ms),
    transform 0.6s var(--ease-out-expo) calc(var(--i) * 100ms);
}

.entry.show {
  opacity: 1;
  transform: translateY(0);
}

.entry-aside {
  padding-top: 4px;
  text-align: right;
}

.entry-date {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  white-space: nowrap;
  transition: color 0.4s ease;
}

.entry-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.connector-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border-mid);
  border: 2px solid var(--bg-base);
  outline: 1px solid var(--border-mid);
  flex-shrink: 0;
  margin-top: 4px;
  transition: background 0.3s ease, outline-color 0.3s ease;
}

.entry:hover .connector-dot {
  background: var(--gold);
  outline-color: var(--gold);
}

.connector-line {
  width: 1px;
  flex: 1;
  background: var(--border-subtle);
  margin: 6px 0;
  min-height: 40px;
}

.entry-body {
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.entry-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

h3 {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin: 0 0 4px;
  transition: color 0.4s ease;
}

.company {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.03em;
  transition: color 0.4s ease;
}

.company a {
  color: var(--gold);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.company a:hover { border-bottom-color: var(--gold); }

.location {
  color: var(--text-faint);
}

.badge {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.4s ease, border-color 0.4s ease;
}

.badge.Freelance {
  color: var(--gold);
  border-color: color-mix(in srgb, var(--gold) 30%, transparent);
}

.entry-body > p {
  font-size: 13.5px;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.75;
  max-width: 560px;
  transition: color 0.4s ease;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: var(--bg-surface);
  color: var(--text-faint);
  border: 1px solid var(--border-subtle);
  transition: color 0.3s ease, border-color 0.3s ease, background 0.4s ease;
}

.entry:hover .tag {
  color: var(--text-secondary);
  border-color: var(--border-mid);
}

.resume-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  padding: 40px 0;
  border-top: 1px solid var(--border-subtle);
  max-width: 860px;
}

.resume-strip .overline { margin: 0; }

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

.btn-primary:hover {
  background: var(--gold-hi);
  gap: 14px;
}

.dl-icon {
  width: 15px;
  height: 15px;
  color: var(--bg-base);
}

@media (max-width: 768px) {
  .experience { padding: 60px 24px 80px; }

  .entry {
    grid-template-columns: 24px 1fr;
    gap: 0 16px;
  }

  .entry-aside { display: none; }

  .entry-date {
    display: block;
    font-size: 10px;
    color: var(--text-faint);
    margin-bottom: 6px;
  }

  .entry-body::before {
    content: attr(data-period);
  }
}
</style>