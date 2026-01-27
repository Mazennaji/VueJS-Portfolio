<template>
  <section class="about">
    <div class="container">
      <div class="profile">
        <img src="/profile.png" alt="Profile" />
      </div>

      <div class="content">
        <h1>About Me</h1>
        <p>Passionate frontend developer building modern, responsive web interfaces.</p>

        <h2>Skills & Technologies</h2>
        <div class="skills-cards">
          <div v-for="s in skills" :key="s.name" class="skill-card">
            <img :src="s.logo" :alt="s.name" class="tech-logo" />
            <h3>{{ s.name }}</h3>
            <p>{{ s.level }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { name: "HTML5", level: "95%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/html5.svg" },
  { name: "CSS3", level: "90%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/css3.svg" },
  { name: "JavaScript", level: "85%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/javascript.svg" },
  { name: "Vue.js", level: "90%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/vue-dot-js.svg" },
  { name: "React", level: "85%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/react.svg" },
  { name: "Svelte", level: "70%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/svelte.svg" },
  { name: "Tailwind CSS", level: "80%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/tailwindcss.svg" },
  { name: "Bootstrap", level: "80%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/bootstrap.svg" },
  { name: "Git", level: "75%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/git.svg" },
  { name: "D3.js", level: "65%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/d3-dot-js.svg" },
  { name: "Grunt", level: "60%", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/grunt.svg" },
]
</script>

<style scoped>
.about { padding: 60px 20px; background: var(--bg); color: var(--text); transition: all 0.3s; }

.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: auto;
  gap: 40px;
}

.profile img { width: 250px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

.content { flex: 1; }

.content h1 { font-size: 2.5rem; margin-bottom: 15px; }
.content p { line-height: 1.6; margin-bottom: 25px; }
.content h2 { margin-bottom: 20px; }

/* Skills cards */
.skills-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.skill-card {
  background: var(--card-bg);
  color: var(--card-text);
  border-radius: 12px;
  padding: 20px;
  flex: 1 1 150px;
  max-width: 180px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.skill-card h3 { margin: 10px 0 5px; font-size: 1.1rem; }
.skill-card p { color: var(--card-text); }

.tech-logo { width: 40px; height: 40px; object-fit: contain; }

/* Responsive */
@media (max-width: 768px) {
  .container { flex-direction: column; align-items: center; }
  .profile img { width: 200px; }
  .skills-cards { justify-content: center; }
}
</style>
