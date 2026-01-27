<script setup>
import { ref } from "vue"

const name = ref("")
const email = ref("")
const message = ref("")
const success = ref(false)
const error = ref("")

function submit() {
  if (!name.value || !email.value || !message.value) {
    error.value = "Please fill all fields!"
    success.value = false
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = "Please enter a valid email!"
    success.value = false
    return
  }

  error.value = ""
  success.value = true

  name.value = ""
  email.value = ""
  message.value = ""
}
</script>

<template>
  <section class="contact">
    <h1>Contact</h1>

    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <textarea v-model="message" placeholder="Message"></textarea>

    <button @click="submit">Send</button>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Message sent successfully!</p>
  </section>
</template>

<style scoped>
.contact {
  padding: 50px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  animation: fadeIn 0.8s ease forwards;
}

input, textarea {
  margin: 10px 0;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border 0.3s;
}

input:focus, textarea:focus {
  border-color: black;
  outline: none;
}

button {
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 6px;
  background: black;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #333;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.dark input, .dark textarea {
  background: #222;
  color: #eee;
  border: 1px solid #555;
}

.dark button {
  background: #eee;
  color: #111;
}

.dark button:hover {
  background: #ccc;
}
</style>
