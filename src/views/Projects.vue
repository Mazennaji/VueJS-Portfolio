<script setup>
import { onMounted } from "vue";

const projects = [
  { title: "Landing Page", desc: "Responsive landing page", img: "/img1.jpg" },
  { title: "Dashboard UI", desc: "Admin dashboard", img: "/img2.jpg" },
  { title: "Portfolio", desc: "Vue portfolio site", img: "/img3.jpg" },
];

onMounted(() => {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 },
  );

  cards.forEach((card) => observer.observe(card));
});
</script>

<template>
  <section class="projects">
    <h1>Projects</h1>

    <div v-for="p in projects" :key="p.title" class="card">
      <img :src="p.img" alt="" class="project-img" />
      <h3>{{ p.title }}</h3>
      <p>{{ p.desc }}</p>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 50px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.card.show {
  opacity: 1;
  transform: translateY(0);
}

.project-img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

</style>
