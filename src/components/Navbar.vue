<template>
  <nav :class="{ scrolled, 'menu-open': openMenu }">
    <div class="nav-inner">

      <router-link to="/" class="wordmark">John Doe</router-link>

      <div class="nav-links">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
          <span class="link-dot" />
        </router-link>
      </div>

      <div class="nav-actions">
        <button class="theme-btn" @click="$emit('toggle-dark')" :aria-label="isDark ? 'Switch to light' : 'Switch to dark'">
          <svg v-if="!isDark" viewBox="0 0 24 24" fill="none" class="theme-icon">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.5"/>
            <g stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <line x1="12" y1="2.5"  x2="12" y2="4.5"/>
              <line x1="12" y1="19.5" x2="12" y2="21.5"/>
              <line x1="2.5"  y1="12" x2="4.5"  y2="12"/>
              <line x1="19.5" y1="12" x2="21.5" y2="12"/>
              <line x1="5.6"  y1="5.6"  x2="7"    y2="7"/>
              <line x1="17"   y1="17"   x2="18.4" y2="18.4"/>
              <line x1="18.4" y1="5.6"  x2="17"   y2="7"/>
              <line x1="7"    y1="17"   x2="5.6"  y2="18.4"/>
            </g>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" class="theme-icon">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button class="burger" @click="toggleMenu" :aria-label="openMenu ? 'Close menu' : 'Open menu'">
          <span class="bar bar-1" />
          <span class="bar bar-2" />
        </button>
      </div>

    </div>

    <Transition name="mobile-menu">
      <div v-if="openMenu" class="mobile-menu">
        <router-link
          v-for="(link, i) in links"
          :key="link.to"
          :to="link.to"
          class="mobile-link"
          :style="`--i: ${i}`"
          @click="openMenu = false"
        >
          <span class="mobile-num">0{{ i + 1 }}</span>
          {{ link.label }}
          <span class="mobile-arrow">→</span>
        </router-link>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

defineProps({ isDark: Boolean })
defineEmits(["toggle-dark"])

const links = [
  { to: "/",         label: "Home"     },
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/contact",  label: "Contact"  },
]

const openMenu = ref(false)
const scrolled = ref(false)

function toggleMenu() { openMenu.value = !openMenu.value }
function onScroll()   { scrolled.value = window.scrollY > 40 }

onMounted(()  => window.addEventListener("scroll", onScroll))
onUnmounted(() => window.removeEventListener("scroll", onScroll))
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  font-family: var(--font-sans);
  transition: background 0.4s ease, border-color 0.4s ease;
  border-bottom: 1px solid transparent;
}

nav.scrolled {
  background: color-mix(in srgb, var(--bg-base) 85%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--border-subtle);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 68px;
  max-width: 1200px;
  margin: 0 auto;
}

.wordmark {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: -0.01em;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.wordmark:hover { color: var(--gold); }

.nav-links {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-link {
  position: relative;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  padding-bottom: 2px;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text-primary);
}

.link-dot {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--gold);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-link:hover .link-dot,
.nav-link.router-link-active .link-dot {
  transform: translateX(-50%) scale(1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.theme-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.theme-btn:hover {
  color: var(--gold);
  border-color: var(--gold);
}

.theme-icon {
  width: 15px;
  height: 15px;
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  padding: 0 9px;
  transition: border-color 0.3s ease;
}

.burger:hover { border-color: var(--gold); }

.bar {
  display: block;
  height: 1px;
  background: var(--text-secondary);
  transition: width 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.bar-1 { width: 18px; }
.bar-2 { width: 12px; }

.menu-open .bar-1 {
  width: 18px;
  transform: translateY(3px) rotate(45deg);
}

.menu-open .bar-2 {
  width: 18px;
  transform: translateY(-3px) rotate(-45deg);
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
  border-top: 1px solid var(--border-subtle);
  padding: 8px 0 24px;
  transition: background 0.4s ease;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 32px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--border-subtle);
  transition: color 0.3s ease, padding-left 0.3s ease;
  animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i) * 50ms) both;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  color: var(--text-primary);
  padding-left: 40px;
}

.mobile-num {
  font-family: var(--font-serif);
  font-size: 15px;
  color: var(--border-mid);
  font-weight: 700;
  min-width: 24px;
  transition: color 0.3s ease;
}

.mobile-link:hover .mobile-num { color: var(--gold); }

.mobile-arrow {
  margin-left: auto;
  font-size: 14px;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-link:hover .mobile-arrow {
  opacity: 1;
  transform: translateX(0);
}

.mobile-menu-enter-active { transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.mobile-menu-leave-active { transition: opacity 0.2s ease, transform 0.25s ease; }
.mobile-menu-enter-from   { opacity: 0; transform: translateY(-8px); }
.mobile-menu-leave-to     { opacity: 0; transform: translateY(-4px); }

@keyframes slide-in {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .burger    { display: flex; }
  .nav-inner { padding: 0 24px; }
}
</style>