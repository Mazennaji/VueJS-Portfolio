<template>
  <section class="not-found">
    <div class="content">
      <span class="code">404</span>
      <h1>Page not <em>found</em></h1>
      <div class="line" />
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <router-link to="/" class="btn">
        Go home <span class="arrow">→</span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  background: var(--bg-base);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  padding: 0 24px;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fade-up 0.7s var(--ease-out-expo) both;
}

.code {
  font-family: var(--font-serif);
  font-size: clamp(100px, 20vw, 200px);
  font-weight: 700;
  line-height: 1;
  color: var(--border-mid);
  letter-spacing: -0.04em;
  transition: color 0.4s ease;
}

h1 {
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0 0 20px;
  transition: color 0.4s ease;
}

h1 em {
  font-style: italic;
  color: var(--gold);
}

.line {
  width: 48px;
  height: 2px;
  background: var(--gold);
  margin-bottom: 20px;
}

p {
  font-size: 15px;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 360px;
  margin-bottom: 40px;
  transition: color 0.4s ease;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: var(--gold);
  color: var(--bg-base);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s ease, gap 0.3s var(--ease-spring);
}

.btn:hover {
  background: var(--gold-hi);
  gap: 16px;
}

.arrow {
  transition: transform 0.3s var(--ease-spring);
}

.btn:hover .arrow { transform: translateX(3px); }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>