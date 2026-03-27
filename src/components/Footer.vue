<template>
  <footer class="footer">
    <div class="footer-inner">
      <span class="wordmark">John Doe</span>

      <div class="socials">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="s.label"
        >
          <span class="social-icon" :style="`--mask: url('${s.icon}')`" />
        </a>
      </div>

      <span class="copy">© {{ year }} John Doe. All rights reserved.</span>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const socials = [
  {
    label: "GitHub",
    url:   "https://github.com/",
    icon:  "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/github.svg",
  },
  {
    label: "LinkedIn",
    url:   "https://linkedin.com/",
    icon:  "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg",
  },
  {
    label: "Gmail",
    url:   "https://mail.google.com/",
    icon:  "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/gmail.svg",
  },
]
</script>

<style scoped>
.footer {
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  font-family: var(--font-sans);
  transition: background 0.4s ease, border-color 0.4s ease;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.wordmark {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  transition: color 0.4s ease;
}

.socials {
  display: flex;
  align-items: center;
  gap: 4px;
}

.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  transition: border-color 0.3s ease, background 0.3s ease;
}

.social-link:hover {
  border-color: var(--gold);
  background: color-mix(in srgb, var(--gold) 8%, transparent);
}

.social-icon {
  display: block;
  width: 14px;
  height: 14px;
  background-color: var(--text-muted);
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  transition: background-color 0.3s ease;
}

.social-link:hover .social-icon {
  background-color: var(--gold);
}

.copy {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-faint);
  letter-spacing: 0.04em;
  transition: color 0.4s ease;
}

@media (max-width: 600px) {
  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 28px 24px;
  }
}
</style>