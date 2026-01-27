<template>
  <nav>
    <h2>Portfolio</h2>

    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  box-shadow: 0 2px 10px rgba(0,0,0,.1);
}

a {
  margin-left: 20px;
  text-decoration: none;
  color: black;
}

a.router-link-active {
  font-weight: bold;
}
</style>
