<template>
  <section class="about">
    <div class="container">
      <div class="profile">
        <img src="/profile.png" alt="Profile" />
      </div>

      <div class="content">
        <h1>About Me</h1>
        <p>
          Passionate frontend developer focused on building clean, modern, and
          responsive web interfaces using Vue.js.
        </p>

        <h2>Skills</h2>
        <div class="skills">
          <div class="skill" v-for="s in skills" :key="s.name">
            <span>{{ s.name }}</span>
            <div class="bar">
              <div class="progress" :style="{ width: s.level }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { name: "Vue.js", level: "90%" },
  { name: "HTML & CSS", level: "95%" },
  { name: "JavaScript", level: "85%" },
  { name: "Tailwind / CSS Frameworks", level: "80%" },
]
</script>

<style scoped>
.about {
  padding: 60px 20px;
  background: var(--bg);
  color: var(--text);
  transition: all 0.3s;
}

.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: auto;
  gap: 40px;
}

.profile img {
  width: 250px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.profile img:hover {
  transform: scale(1.05);
}

.content {
  flex: 1;
}

.content h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.content p {
  line-height: 1.6;
  margin-bottom: 25px;
}

.content h2 {
  margin-bottom: 15px;
}

.skills .skill {
  margin-bottom: 15px;
}

.skills span {
  display: block;
  margin-bottom: 5px;
}

.bar {
  width: 100%;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: black;
  border-radius: 5px;
  transition: width 1s ease-in-out;
}

.dark .bar {
  background: #444;
}

.dark .progress {
  background: #eee;
  height: 100%;
}
  
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .profile img {
    width: 200px;
  }
}
</style>
