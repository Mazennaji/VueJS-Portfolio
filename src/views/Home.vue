<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const hero = document.querySelector(".hero");
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--mx", `${x}%`);
    hero.style.setProperty("--my", `${y}%`);
  });
});
</script>

<template>
  <section class="hero">
    <div class="noise" />
    <div class="spotlight" />

    <div class="content">
      <span class="label">Available for work</span>

      <h1>
        <span class="line">Frontend</span>
        <span class="line accent">Developer</span>
      </h1>

      <p>Building clean and modern web interfaces with Vue.</p>

      <div class="actions">
        <router-link to="/projects" class="btn-primary">
          View Projects
          <span class="btn-arrow">→</span>
        </router-link>
        <router-link to="/contact" class="btn-ghost">Get in touch</router-link>
      </div>
    </div>

    <div class="scroll-hint">
      <span class="scroll-line" />
      <span class="scroll-text">Scroll</span>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap");

.hero {
  --mx: 50%;
  --my: 40%;
  position: relative;
  min-height: 100vh;
  background: #0b0b0e;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: "DM Sans", sans-serif;
  color: #e8e4dc;
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
  background: radial-gradient(
    600px circle at var(--mx) var(--my),
    rgba(201, 169, 110, 0.07),
    transparent 60%
  );
  pointer-events: none;
  z-index: 1;
  transition: background 0.1s ease;
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
  color: #9a8c78;
  margin-bottom: 28px;
  animation: fade-up 0.8s ease both;
}

.label::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c9a96e;
  animation: pulse 2.4s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.7); }
}

h1 {
  display: flex;
  flex-direction: column;
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(64px, 12vw, 140px);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.03em;
  margin: 0 0 32px;
  color: #f0ebe2;
}

.line {
  display: block;
  animation: fade-up 0.8s ease both;
}

.line:nth-child(2) {
  animation-delay: 0.1s;
}

.accent {
  font-style: italic;
  color: #c9a96e;
}

p {
  font-size: 16px;
  font-weight: 300;
  color: #6e6a64;
  letter-spacing: 0.01em;
  line-height: 1.7;
  margin: 0 0 48px;
  animation: fade-up 0.8s ease 0.2s both;
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
  background: #c9a96e;
  color: #0b0b0e;
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s ease, gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
  background: #d9bc88;
  gap: 16px;
}

.btn-arrow {
  font-size: 14px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover .btn-arrow {
  transform: translateX(3px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  border: 1px solid #2a2a30;
  color: #9a8c78;
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.btn-ghost:hover {
  border-color: #c9a96e;
  color: #c9a96e;
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
  background: linear-gradient(to bottom, transparent, #c9a96e);
  animation: grow-line 1.8s ease 1.2s infinite;
  transform-origin: top;
}

@keyframes grow-line {
  0% { transform: scaleY(0); opacity: 0; }
  30% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0; }
}

.scroll-text {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #4a4640;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>