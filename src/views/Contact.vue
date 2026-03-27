<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const isDark = ref(document.documentElement.classList.contains("dark"))

let mo
onMounted(() => {
  mo = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains("dark")
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
})

onUnmounted(() => mo?.disconnect())

const name    = ref("")
const email   = ref("")
const message = ref("")
const success = ref(false)
const error   = ref("")
const sending = ref(false)
const focused = ref("")

function submit() {
  if (!name.value || !email.value || !message.value) {
    error.value = "All fields are required."
    success.value = false
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = "Enter a valid email address."
    success.value = false
    return
  }

  error.value = ""
  sending.value = true

  setTimeout(() => {
    sending.value = false
    success.value = true
    name.value = ""
    email.value = ""
    message.value = ""
  }, 1200)
}
</script>

<template>
  <section class="contact" :class="{ light: !isDark }">
    <header class="contact-header">
      <span class="overline">Let's talk</span>
      <h1>Contact</h1>
      <div class="header-line" />
    </header>

    <form class="form" @submit.prevent="submit" novalidate>
      <div class="field" :class="{ active: focused === 'name' || name }">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          autocomplete="name"
          @focus="focused = 'name'"
          @blur="focused = ''"
        />
      </div>

      <div class="field" :class="{ active: focused === 'email' || email }">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          @focus="focused = 'email'"
          @blur="focused = ''"
        />
      </div>

      <div class="field textarea-field" :class="{ active: focused === 'message' || message }">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="message"
          rows="5"
          @focus="focused = 'message'"
          @blur="focused = ''"
        />
      </div>

      <Transition name="status">
        <p v-if="error" class="status error">
          <span class="status-dot" />{{ error }}
        </p>
        <p v-else-if="success" class="status success">
          <span class="status-dot" />Message sent — I'll be in touch soon.
        </p>
      </Transition>

      <button type="submit" class="btn" :class="{ sending }">
        <span class="btn-label">{{ sending ? "Sending…" : "Send Message" }}</span>
        <span class="btn-arrow">→</span>
      </button>
    </form>
  </section>
</template>

<style scoped>
.contact {
  min-height: 100vh;
  background: var(--bg-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 100px;
  font-family: var(--font-sans);
  color: var(--text-primary);
  transition: background 0.4s ease, color 0.4s ease;
  animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

.contact-header {
  text-align: center;
  margin-bottom: 56px;
}

.overline {
  display: block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 12px;
  transition: color 0.4s ease;
}

h1 {
  font-family: var(--font-serif);
  font-size: clamp(52px, 8vw, 88px);
  font-weight: 700;
  line-height: 0.9;
  color: var(--text-primary);
  margin: 0 0 24px;
  letter-spacing: -0.02em;
  transition: color 0.4s ease;
}

.header-line {
  width: 48px;
  height: 2px;
  background: var(--gold);
  margin: 0 auto;
}

.form {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.field {
  position: relative;
  margin-bottom: 2px;
  background: var(--bg-surface);
  transition: background 0.4s ease;
}

.field label {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 13px;
  font-weight: 400;
  color: var(--text-faint);
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.03em;
}

.textarea-field label {
  top: 22px;
  transform: none;
}

.field.active label {
  top: 10px;
  transform: none;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
}

.textarea-field.active label { top: 10px; }

input, textarea {
  width: 100%;
  padding: 28px 20px 10px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 300;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease, color 0.4s ease;
  resize: none;
}

input:focus, textarea:focus { border-bottom-color: var(--gold); }

textarea {
  padding-top: 28px;
  line-height: 1.7;
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 400;
  letter-spacing: 0.02em;
  margin: 20px 0 0;
  padding: 0;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

.error              { color: #b05535; }
.error .status-dot  { background: #b05535; }
.success            { color: #7a9e6a; }
.success .status-dot { background: #7a9e6a; }

.status-enter-active, .status-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.status-enter-from, .status-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.btn {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease, border-color 0.3s ease, background 0.4s ease;
}

.btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.btn:hover::before  { transform: scaleX(1); }
.btn:hover          { color: var(--bg-base); border-color: var(--gold); }

.btn-label,
.btn-arrow {
  position: relative;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn:hover .btn-arrow { transform: translateX(4px); }

.btn.sending {
  pointer-events: none;
  opacity: 0.6;
}
</style>