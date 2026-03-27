<template>
  <section class="testimonials">
    <header class="t-header">
      <span class="overline">Kind words</span>
      <h1>Testi<em>monials</em></h1>
      <div class="header-line" />
    </header>

    <div class="grid">
      <div
        v-for="(t, i) in testimonials"
        :key="i"
        class="card"
        :style="`--i: ${i}`"
      >
        <span class="quote-mark">"</span>
        <p class="quote">{{ t.quote }}</p>
        <div class="author">
          <div class="author-avatar">{{ t.name[0] }}</div>
          <div class="author-info">
            <span class="author-name">{{ t.name }}</span>
            <span class="author-role">{{ t.role }}, {{ t.company }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue"

const testimonials = [
  {
    quote:   "Working with John was a seamless experience. He translated our Figma designs into pixel-perfect Vue components faster than we thought possible, and the code quality was exceptional.",
    name:    "Sarah Chen",
    role:    "Product Designer",
    company: "Acme Studio",
  },
  {
    quote:   "John has a rare ability to think like both a designer and an engineer. The performance improvements he made to our dashboard cut our load time in half.",
    name:    "Marcus Reid",
    role:    "CTO",
    company: "Bright Agency",
  },
  {
    quote:   "Attention to detail, clear communication, and delivered ahead of schedule. Exactly what you want from a frontend developer.",
    name:    "Leila Mansour",
    role:    "Founder",
    company: "Launchpad",
  },
]

onMounted(() => {
  const cards = document.querySelectorAll(".testimonials .card")
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show") })
  }, { threshold: 0.15 })
  cards.forEach(c => obs.observe(c))
})
</script>

<style scoped>
.testimonials {
  background: var(--bg-base);
  padding: 80px 60px 100px;
  font-family: var(--font-sans);
  transition: background 0.4s ease;
}

.t-header { margin-bottom: 64px; }

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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2px;
}

.card {
  background: var(--bg-surface);
  padding: 40px 36px 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-left: 2px solid transparent;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease calc(var(--i) * 100ms),
    transform 0.6s var(--ease-out-expo) calc(var(--i) * 100ms),
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

.quote-mark {
  font-family: var(--font-serif);
  font-size: 64px;
  line-height: 0.6;
  color: var(--gold);
  opacity: 0.4;
  font-weight: 700;
}

.quote {
  font-size: 14.5px;
  font-weight: 300;
  color: var(--text-secondary);
  line-height: 1.85;
  flex: 1;
  transition: color 0.4s ease;
}

.card:hover .quote { color: var(--text-primary); }

.author {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
}

.author-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--gold) 15%, var(--bg-raised));
  border: 1px solid color-mix(in srgb, var(--gold) 30%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: 700;
  color: var(--gold);
  flex-shrink: 0;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 0.02em;
  transition: color 0.4s ease;
}

.author-role {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-faint);
  letter-spacing: 0.04em;
  transition: color 0.4s ease;
}

@media (max-width: 768px) {
  .testimonials { padding: 60px 24px 80px; }
  .grid { grid-template-columns: 1fr; }
}
</style>