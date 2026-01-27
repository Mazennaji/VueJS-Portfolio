<script setup>
const projects = [
  {
    title: "Landing Page",
    desc: "Responsive landing page design",
  },
  {
    title: "Dashboard UI",
    desc: "Admin dashboard interface",
  },
  {
    title: "Portfolio",
    desc: "Vue based portfolio website",
  },
]
</script>

<template>
  <section class="projects">
    <h1>Projects</h1>

    <div class="grid">
      <div v-for="p in projects" :key="p.title" class="card">
        <h3>{{ p.title }}</h3>
        <p>{{ p.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 50px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  gap: 20px;
}

.card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,.1);
  transition: .3s;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
