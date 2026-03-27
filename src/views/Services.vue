<template>
  <section class="services">
    <header class="services-header">
      <span class="overline">What I offer</span>
      <h1>Ser<em>vices</em></h1>
      <div class="header-line" />
    </header>

    <div class="grid">
      <div
        v-for="(s, i) in services"
        :key="s.title"
        class="card"
        :style="`--i: ${i}`"
      >
        <div class="card-top">
          <span class="card-num">0{{ i + 1 }}</span>
          <span class="card-icon" :style="`--mask: url('${s.icon}')`" />
        </div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.desc }}</p>
        <ul class="deliverables">
          <li v-for="d in s.deliverables" :key="d">{{ d }}</li>
        </ul>
        <div class="card-footer">
          <span class="price">{{ s.price }}</span>
          <router-link to="/contact" class="cta">
            Get started <span class="arrow">→</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="bottom-cta">
      <p>Not sure what you need? Let's figure it out together.</p>
      <router-link to="/contact" class="btn-primary">
        Start a conversation <span class="arrow">→</span>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue"

const services = [
  {
    title: "UI Development",
    desc:  "Pixel-perfect implementation of designs into fast, accessible, production-ready interfaces.",
    icon:  "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/vuedotjs.svg",
    price: "From $800",
    deliverables: [
      "Component library setup",
      "Responsive layouts",
      "Cross-browser compatibility",
      "Accessibility (WCAG 2.1)",
    ],
  },
  {
    title: "Design to Code",
    desc:  "I take your Figma or Sketch files and turn them into clean, maintainable Vue or React code.",
    icon:  "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/figma.svg",
    price: "From $600",
    deliverables: [
      "Figma / Sketch handoff",
      "Animations & transitions",
      "Design system tokens",
      "Storybook documentation",
    ],
  },
  {
    title: "Performance Audit",
    desc:  "A deep dive into your existing frontend — identifying bottlenecks and delivering a prioritized fix list.",
    icon:  "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/lighthouse.svg",
    price: "From $400",
    deliverables: [
      "Lighthouse audit report",
      "Core Web Vitals analysis",
      "Bundle size breakdown",
      "Prioritized action plan",
    ],
  },
  {
    title: "Freelance Retainer",
    desc:  "Ongoing frontend support on a monthly basis — ideal for startups that need a reliable dev without a full-time hire.",
    icon:  "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/git.svg",
    price: "From $1,500 / mo",
    deliverables: [
      "Up to 40 hrs / month",
      "Feature development",
      "Code reviews",
      "Weekly sync call",
    ],
  },
]

onMounted(() => {
  const cards = document.querySelectorAll(".card")
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show") })
  }, { threshold: 0.1 })
  cards.forEach(c => obs.observe(c))
})
</script>

<style scoped>
.services {
  min-height: 100vh;
  background: var(--bg-base);
  padding: 80px 60px 100px;
  font-family: var(--font-sans);
  color: var(--text-primary);
  transition: background 0.4s ease, color 0.4s ease;
}

.services-header { margin-bottom: 64px; }

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
  font-size: clamp(52px, 8vw, 96px);
  font-weight: 700;
  line-height: 0.9;
  color: var(--text-primary);
  margin: 0 0 28px;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2px;
  margin-bottom: 80px;
}

.card {
  background: var(--bg-surface);
  padding: 36px 32px 32px;
  border-left: 2px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease calc(var(--i) * 80ms),
    transform 0.6s var(--ease-out-expo) calc(var(--i) * 80ms),
    border-color 0.3s ease,
    background 0.3s ease;
}

.card.show {
  opacity: 1;
  transform: translateY(0);
}

.card:hover {
  background: var(--bg-raised);
  border-left-color: var(--gold);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-num {
  font-family: var(--font-serif);
  font-size: 13px;
  font-weight: 700;
  color: var(--border-mid);
  letter-spacing: 0.05em;
  transition: color 0.4s ease;
}

.card:hover .card-num { color: var(--gold); }

.card-icon {
  display: block;
  width: 22px;
  height: 22px;
  background-color: var(--text-faint);
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  transition: background-color 0.3s ease;
}

.card:hover .card-icon { background-color: var(--gold); }

h3 {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin: 0;
  transition: color 0.4s ease;
}

.card > p {
  font-size: 13.5px;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0;
  transition: color 0.4s ease;
}

.deliverables {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
  flex: 1;
}

.deliverables li {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color 0.4s ease;
}

.deliverables li::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 1px;
  background: var(--gold);
  flex-shrink: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
  margin-top: auto;
}

.price {
  font-size: 13px;
  font-weight: 500;
  color: var(--gold);
  letter-spacing: 0.04em;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease, gap 0.3s var(--ease-spring);
}

.cta:hover {
  color: var(--gold);
  gap: 10px;
}

.arrow {
  transition: transform 0.3s var(--ease-spring);
}

.cta:hover .arrow { transform: translateX(3px); }

.bottom-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  padding: 64px 24px;
  border-top: 1px solid var(--border-subtle);
}

.bottom-cta p {
  font-size: 15px;
  font-weight: 300;
  color: var(--text-muted);
  transition: color 0.4s ease;
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

.btn-primary:hover {
  background: var(--gold-hi);
  gap: 16px;
}

.btn-primary:hover .arrow { transform: translateX(3px); }

@media (max-width: 768px) {
  .services { padding: 60px 24px 80px; }
  .grid { grid-template-columns: 1fr; }
}
</style>