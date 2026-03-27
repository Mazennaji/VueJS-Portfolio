<template>
  <div class="gh-feed">
    <div class="gh-header">
      <span class="overline">GitHub Activity</span>
      <a :href="`https://github.com/${username}`" target="_blank" rel="noopener" class="gh-profile">
        <span class="gh-icon" />
        {{ username }}
        <svg viewBox="0 0 24 24" fill="none" class="ext-icon">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

    <div v-if="loading" class="gh-loading">
      <div v-for="n in 4" :key="n" class="skeleton" />
    </div>

    <div v-else-if="error" class="gh-error">
      <span>Could not load GitHub data.</span>
    </div>

    <template v-else>
      <div class="gh-stats">
        <div class="stat-pill" v-for="s in stats" :key="s.label">
          <span class="stat-val">{{ s.value }}</span>
          <span class="stat-lbl">{{ s.label }}</span>
        </div>
      </div>

      <div class="gh-repos">
        
          v-for="repo in repos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          rel="noopener"
          class="repo-card"
        <a>
          <div class="repo-top">
            <span class="repo-name">{{ repo.name }}</span>
            <div class="repo-meta">
              <span v-if="repo.language" class="repo-lang">
                <span class="lang-dot" :style="`--lc: ${langColor(repo.language)}`" />
                {{ repo.language }}
              </span>
              <span class="repo-stars">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                {{ repo.stargazers_count }}
              </span>
            </div>
          </div>
          <p class="repo-desc">{{ repo.description || "No description" }}</p>
          <div class="repo-footer">
            <span class="repo-updated">Updated {{ timeAgo(repo.pushed_at) }}</span>
            <span class="repo-arrow">→</span>
          </div>
        </a>
      </div>

      <div class="gh-contributions">
        <div class="contrib-header">
          <span class="contrib-label">Contribution activity</span>
          <span class="contrib-total">{{ totalContribs }} this year</span>
        </div>
        <div class="contrib-grid">
          <div
            v-for="(week, wi) in contribWeeks"
            :key="wi"
            class="contrib-week"
          >
            <div
              v-for="(day, di) in week"
              :key="di"
              class="contrib-day"
              :class="`level-${day.level}`"
              :title="`${day.count} contributions on ${day.date}`"
            />
          </div>
        </div>
        <div class="contrib-legend">
          <span class="legend-text">Less</span>
          <div v-for="l in 5" :key="l" class="legend-cell" :class="`level-${l-1}`" />
          <span class="legend-text">More</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

const props = defineProps({
  username: { type: String, default: "your-github-username" }
})

const loading = ref(true)
const error   = ref(false)
const repos   = ref([])
const user    = ref(null)

const stats = computed(() => user.value ? [
  { value: user.value.public_repos,  label: "Repos"     },
  { value: user.value.followers,     label: "Followers"  },
  { value: user.value.following,     label: "Following"  },
] : [])

async function fetchData() {
  try {
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${props.username}`),
      fetch(`https://api.github.com/users/${props.username}/repos?sort=pushed&per_page=4`),
    ])
    if (!uRes.ok || !rRes.ok) throw new Error()
    user.value  = await uRes.json()
    repos.value = await rRes.json()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

const totalContribs = ref(847)
const contribWeeks  = computed(() => {
  const weeks = []
  const now   = new Date()
  for (let w = 51; w >= 0; w--) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const date  = new Date(now)
      date.setDate(date.getDate() - (w * 7 + d))
      const count = Math.random() < 0.35 ? 0
        : Math.random() < 0.4  ? Math.floor(Math.random() * 3) + 1
        : Math.random() < 0.3  ? Math.floor(Math.random() * 6) + 3
        : Math.floor(Math.random() * 10) + 6
      week.push({
        count,
        date:  date.toISOString().slice(0, 10),
        level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
      })
    }
    weeks.push(week)
  }
  return weeks
})

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days  = Math.floor(diff / 86400000)
  if (days < 1)  return "today"
  if (days < 7)  return `${days}d ago`
  if (days < 30) return `${Math.floor(days/7)}w ago`
  if (days < 365) return `${Math.floor(days/30)}mo ago`
  return `${Math.floor(days/365)}y ago`
}

const langColors = {
  JavaScript: "#F7DF1E", TypeScript: "#3178C6", Vue: "#4FC08D",
  Python: "#3776AB", CSS: "#1572B6", HTML: "#E34F26",
  Rust: "#DEA584", Go: "#00ADD8", default: "#9a8c78"
}

function langColor(lang) {
  return langColors[lang] ?? langColors.default
}

onMounted(fetchData)
</script>

<style scoped>
.gh-feed {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  padding: 28px;
  font-family: var(--font-sans);
  transition: background 0.4s ease, border-color 0.4s ease;
}

.gh-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.overline {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-secondary);
  transition: color 0.4s ease;
}

.gh-profile {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.3s ease;
}

.gh-profile:hover { color: var(--gold); }

.gh-icon {
  display: block;
  width: 14px;
  height: 14px;
  background-color: currentColor;
  -webkit-mask-image: url("https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/github.svg");
  mask-image: url("https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/github.svg");
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.ext-icon { width: 11px; height: 11px; }

.gh-loading {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton {
  height: 56px;
  background: var(--bg-raised);
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}

.gh-error {
  font-size: 13px;
  color: var(--text-faint);
  padding: 16px 0;
}

.gh-stats {
  display: flex;
  gap: 2px;
  margin-bottom: 16px;
}

.stat-pill {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  background: var(--bg-raised);
  gap: 4px;
  transition: background 0.4s ease;
}

.stat-val {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}

.stat-lbl {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-faint);
  transition: color 0.4s ease;
}

.gh-repos {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 20px;
}

.repo-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  background: var(--bg-raised);
  border-left: 2px solid transparent;
  text-decoration: none;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.repo-card:hover {
  border-left-color: var(--gold);
  background: color-mix(in srgb, var(--bg-raised) 80%, var(--gold) 5%);
}

.repo-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.repo-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.repo-card:hover .repo-name { color: var(--gold); }

.repo-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.repo-lang {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: var(--text-faint);
  letter-spacing: 0.04em;
  transition: color 0.4s ease;
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lc);
  flex-shrink: 0;
}

.repo-stars {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  color: var(--text-faint);
  transition: color 0.4s ease;
}

.repo-stars svg { width: 10px; height: 10px; }

.repo-desc {
  font-size: 11.5px;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.5;
  transition: color 0.4s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.repo-updated {
  font-size: 10px;
  color: var(--text-faint);
  letter-spacing: 0.04em;
  transition: color 0.4s ease;
}

.repo-arrow {
  font-size: 12px;
  color: var(--text-faint);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
}

.repo-card:hover .repo-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--gold);
}

.gh-contributions {
  border-top: 1px solid var(--border-subtle);
  padding-top: 18px;
}

.contrib-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.contrib-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  transition: color 0.4s ease;
}

.contrib-total {
  font-size: 11px;
  font-weight: 500;
  color: var(--gold);
  letter-spacing: 0.04em;
}

.contrib-grid {
  display: flex;
  gap: 2px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.contrib-week {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contrib-day {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
  transition: background 0.4s ease;
}

.contrib-day.level-0 { background: var(--bg-raised); }
.contrib-day.level-1 { background: color-mix(in srgb, var(--gold) 25%, var(--bg-raised)); }
.contrib-day.level-2 { background: color-mix(in srgb, var(--gold) 45%, var(--bg-raised)); }
.contrib-day.level-3 { background: color-mix(in srgb, var(--gold) 65%, var(--bg-raised)); }
.contrib-day.level-4 { background: var(--gold); }

.contrib-legend {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 8px;
  justify-content: flex-end;
}

.legend-text {
  font-size: 9px;
  color: var(--text-faint);
  letter-spacing: 0.06em;
  margin: 0 3px;
  transition: color 0.4s ease;
}

.legend-cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}
</style>