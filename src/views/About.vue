<script setup>
import { onMounted, ref } from "vue";
import GitHubFeed from "../components/GitHubFeed.vue"
import PageTransition from "../components/PageTransition.vue";

const isDark = ref(document.documentElement.classList.contains("dark"));
const visitors = ref(null);

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

onMounted(() => {
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  const cards = document.querySelectorAll(".skill-card");
  const bars = document.querySelectorAll(".skill-bar-fill");

  const cardObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    },
    { threshold: 0.15 },
  );

  const barObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("grow");
      });
    },
    { threshold: 0.3 },
  );

  cards.forEach((c) => cardObs.observe(c));
  bars.forEach((b) => barObs.observe(b));

  fetch("https://api.countapi.xyz/hit/demo-project/visits")
    .then((r) => r.json())
    .then((d) => {
      visitors.value = d.value.toLocaleString();
    })
    .catch(() => {
      visitors.value = "3,241";
    });
});

const tools = [
  { name: "VS Code",  tag: "editor",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "WebStorm",  tag: "editor",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg" },
  { name: "GitHub",   tag: "vcs",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma",    tag: "design",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Postman",  tag: "api",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Chrome",   tag: "browser", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" },
  { name: "Ubuntu",   tag: "os",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg" },
  { name: "Vercel",   tag: "hosting", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  { name: "Vite",     tag: "build",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" },
  { name: "Notion",   tag: "notes",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
];

const skills = [
  {
    name: "HTML5",
    level: "95%",
    colorDark: "#E34F26",
    colorLight: "#E34F26",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/html5.svg",
  },
  {
    name: "CSS3",
    level: "90%",
    colorDark: "#1572B6",
    colorLight: "#1572B6",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/css3.svg",
  },
  {
    name: "JavaScript",
    level: "85%",
    colorDark: "#F7DF1E",
    colorLight: "#c9a800",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/javascript.svg",
  },
  {
    name: "TypeScript",
    level: "80%",
    colorDark: "#3178C6",
    colorLight: "#3178C6",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/typescript.svg",
  },
  {
    name: "Vue.js",
    level: "90%",
    colorDark: "#4FC08D",
    colorLight: "#368a62",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/vuedotjs.svg",
  },
  {
    name: "React",
    level: "85%",
    colorDark: "#61DAFB",
    colorLight: "#0a9bb5",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/react.svg",
  },
  {
    name: "Svelte",
    level: "70%",
    colorDark: "#FF3E00",
    colorLight: "#FF3E00",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/svelte.svg",
  },
  {
    name: "Tailwind",
    level: "80%",
    colorDark: "#06B6D4",
    colorLight: "#0284a0",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/tailwindcss.svg",
  },
  {
    name: "Bootstrap",
    level: "80%",
    colorDark: "#7952B3",
    colorLight: "#7952B3",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/bootstrap.svg",
  },
  {
    name: "Supabase",
    level: "75%",
    colorDark: "#3FCF8E",
    colorLight: "#3FCF8E",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/supabase.svg",
  },
  {
    name: "Firebase",
    level: "73%",
    colorDark: "#FFCA28",
    colorLight: "#FFCA28",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/firebase.svg",
  },
  {
    name: "Git",
    level: "75%",
    colorDark: "#F05032",
    colorLight: "#F05032",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/git.svg",
  },
  {
    name: "Angular",
    level: "70%",
    colorDark: "#DD0031",
    colorLight: "#DD0031",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/angular.svg",
  },
  {
    name: "NPM",
    level: "78%",
    colorDark: "#CB3837",
    colorLight: "#CB3837",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/npm.svg",
  },
  {
    name: "Next.js",
    level: "80%",
    colorDark: "#f8f8f8",
    colorLight: "#1a1a1a",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/nextdotjs.svg",
  },
  {
    name: "Nuxt.js",
    level: "80%",
    colorDark: "#f8f8f8",
    colorLight: "#1a1a1a",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/nuxtdotjs.svg",
  },
  {
    name: "D3.js",
    level: "60%",
    colorDark: "#f9a03c",
    colorLight: "#f9a03c",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
  },
  {
    name: "Grunt",
    level: "70%",
    colorDark: "#c9a96e",
    colorLight: "#c9a96e",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/grunt.svg",
  },
  {
    name: "Three.js",
    level: "70%",
    colorDark: "#ffffff",
    colorLight: "#000000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
  {
    name: "Sass",
    level: "80%",
    colorDark: "#CC6699",
    colorLight: "#CC6699",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/sass.svg",
  },
];
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

          <div class="learning-card">
            <div class="pulse-ring">
              <div class="pulse-dot" />
              <div class="pulse-wave" />
            </div>
            <span class="learning-text">
              Learning <strong>React Query</strong>
            </span>
            <span class="learning-tag">2025</span>
          </div>
        </div>

        <GitHubFeed username="your-github-username" />
        <PageTransition />

        <div class="visitor-counter">
          <div class="counter-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div class="counter-info">
            <span class="counter-number">{{ visitors ?? "—" }}</span>
            <span class="counter-label">total visitors</span>
          </div>
          <div class="counter-bars">
            <span v-for="h in [8,12,9,16,11,20,14,18,10,15]" :key="h" class="bar-seg" :style="`height:${h}px`" />
          </div>
        </div>
      </aside>

      <div class="content">
        <header class="content-header">
          <span class="overline">Who I am</span>
          <h1>About <em>Me</em></h1>
          <div class="header-line" />
        </header>

        <p class="bio">
          I architect and engineer modern frontend systems using the full
          spectrum of today's web technologies. From design systems and
          component architecture to performance optimization and motion design,
          I build interfaces that are not only beautiful, but structurally
          sound, scalable, and production-ready.
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

        <div class="tools-section">
          <span class="overline">Daily Stack</span>
          <div class="tools-grid">
            <div
              v-for="tool in tools"
              :key="tool.name"
              class="tool-card"
            >
              <div class="tool-dot" />
              <div class="tool-img-wrap">
                <img
                  :src="tool.icon"
                  :alt="tool.name"
                  class="tool-img"
                  :style="tool.tag === 'vcs' || tool.name === 'Notion' ? `filter: ${isDark ? 'invert(1)' : 'invert(0)'}` : ''"
                />
              </div>
              <span class="tool-name">{{ tool.name }}</span>
              <span class="tool-tag">{{ tool.tag }}</span>
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

.learning-card {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  padding: 7px 13px 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(122, 158, 106, 0.25);
  background: rgba(122, 158, 106, 0.06);
  width: fit-content;
  position: relative;
  overflow: hidden;
}

.learning-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(122,158,106,0.08), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

.pulse-ring {
  position: relative;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
}

.pulse-dot {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #7a9e6a;
}

.pulse-wave {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid #7a9e6a;
  opacity: 0;
  animation: ripple 2s ease-out infinite;
}

@keyframes ripple {
  0%   { transform: scale(0.6); opacity: 0.8; }
  100% { transform: scale(2);   opacity: 0; }
}

.learning-text {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.learning-text strong {
  font-weight: 600;
  color: var(--text-primary);
}

.learning-tag {
  font-size: 10px;
  font-weight: 500;
  padding: 1px 7px;
  border-radius: 999px;
  background: rgba(122, 158, 106, 0.15);
  color: #7a9e6a;
  letter-spacing: 0.06em;
}

.visitor-counter {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  border-radius: 2px;
}

.counter-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
}

.counter-icon svg {
  width: 16px;
  height: 16px;
  color: var(--text-primary);
}

.counter-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
}

.counter-number {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1;
  font-family: var(--font-serif);
}

.counter-label {
  font-size: 10px;
  color: var(--text-faint);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.counter-bars {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 20px;
}

.bar-seg {
  display: block;
  width: 3px;
  border-radius: 1px;
  background: var(--border-mid);
}

.bar-seg:last-child {
  background: var(--gold);
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

.tools-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 56px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 6px;
}

.tool-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 16px 8px 13px;
  background: var(--bg-surface);
  border-left: 2px solid transparent;
  cursor: default;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.tool-card:hover {
  background: var(--bg-raised);
  border-left-color: var(--gold);
  transform: translateY(-2px);
}

.tool-card:hover .tool-dot {
  opacity: 1;
}

.tool-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.tool-img-wrap {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-img {
  width: 26px;
  height: 26px;
  object-fit: contain;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.tool-card:hover .tool-img {
  opacity: 1;
}

.tool-name {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-primary);
  text-align: center;
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.tool-tag {
  font-size: 10px;
  padding: 1px 7px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-faint);
  letter-spacing: 0.06em;
}

@media (max-width: 800px) {
  .about {
    padding: 60px 24px 80px;
  }
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
  .profile-wrap {
    width: 140px;
  }
  .skill-card {
    grid-template-columns: 36px 1fr 80px;
  }
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}
</style>