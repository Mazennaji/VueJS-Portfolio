<template>
  <section class="hero">
    <h1>Frontend Developer</h1>
    <p>Building clean and modern web interfaces with Vue.</p>
    <router-link to="/projects" class="btn">View Projects</router-link>
  </section>
</template>

<style scoped>
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 3rem;
}

.btn {
  margin-top: 20px;
  padding: 12px 25px;
  background: black;
  color: white;
  text-decoration: none;
}
</style>
