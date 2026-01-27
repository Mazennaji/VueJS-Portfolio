<script setup>
function submit() {
  alert("Message sent (frontend only)")
}
</script>

<template>
  <section class="contact">
    <h1>Contact</h1>

    <input placeholder="Name" />
    <input placeholder="Email" />
    <textarea placeholder="Message"></textarea>

    <button @click="submit">Send</button>
  </section>
</template>

<style scoped>
.contact {
  padding: 50px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
}

input, textarea {
  margin: 10px 0;
  padding: 10px;
}

button {
  padding: 10px;
  background: black;
  color: white;
}
</style>
