<template>
  <div class="calendar">
    <div class="cal-header">
      <span class="overline">Availability</span>
      <div class="cal-nav">
        <button class="nav-btn" @click="prev" :disabled="atMin">
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <span class="cal-month">{{ monthLabel }}</span>
        <button class="nav-btn" @click="next" :disabled="atMax">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>

    <div class="cal-weekdays">
      <span v-for="d in weekdays" :key="d">{{ d }}</span>
    </div>

    <div class="cal-grid">
      <div
        v-for="(cell, i) in cells"
        :key="i"
        class="cell"
        :class="{
          empty:     !cell,
          today:     cell?.isToday,
          past:      cell?.isPast,
          booked:    cell?.status === 'booked',
          busy:      cell?.status === 'busy',
          available: cell?.status === 'available',
        }"
      >
        <span v-if="cell" class="cell-num">{{ cell.day }}</span>
        <span v-if="cell && !cell.isPast" class="cell-dot" />
      </div>
    </div>

    <div class="legend">
      <span class="legend-item" v-for="l in legend" :key="l.label">
        <span class="legend-dot" :class="l.class" />
        {{ l.label }}
      </span>
    </div>

    <div class="status-banner" :class="overallStatus.class">
      <span class="status-dot" />
      {{ overallStatus.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const today   = new Date()
const current = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 1)

const atMin = computed(() => current.value.getTime() <= minDate.getTime())
const atMax = computed(() => current.value.getTime() >= maxDate.getTime())

function prev() {
  if (!atMin.value)
    current.value = new Date(current.value.getFullYear(), current.value.getMonth() - 1, 1)
}
function next() {
  if (!atMax.value)
    current.value = new Date(current.value.getFullYear(), current.value.getMonth() + 1, 1)
}

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

const monthLabel = computed(() =>
  current.value.toLocaleDateString("en-US", { month: "long", year: "numeric" })
)

const schedule = {
  [`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-10`]: "booked",
  [`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-11`]: "booked",
  [`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-12`]: "booked",
  [`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-17`]: "booked",
  [`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-18`]: "booked",
  [`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-22`]: "busy",
  [`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-23`]: "busy",
  [`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-24`]: "busy",
}

function getStatus(y, m, d) {
  const key = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
  return schedule[key] ?? "available"
}

const cells = computed(() => {
  const y   = current.value.getFullYear()
  const m   = current.value.getMonth()
  const first = new Date(y, m, 1)
  const last  = new Date(y, m + 1, 0)

  let startOffset = first.getDay() - 1
  if (startOffset < 0) startOffset = 6

  const result = []
  for (let i = 0; i < startOffset; i++) result.push(null)

  for (let d = 1; d <= last.getDate(); d++) {
    const date    = new Date(y, m, d)
    const isToday = date.toDateString() === today.toDateString()
    const isPast  = date < today && !isToday
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    result.push({
      day: d,
      isToday,
      isPast,
      status: isPast || isWeekend ? "booked" : getStatus(y, m, d),
    })
  }
  return result
})

const overallStatus = computed(() => {
  const y = current.value.getFullYear()
  const m = current.value.getMonth()
  const isCurrentMonth = y === today.getFullYear() && m === today.getMonth()

  const futureCells = cells.value.filter(c => c && !c.isPast)
  const available   = futureCells.filter(c => c.status === "available").length
  const total       = futureCells.length

  if (available === 0)
    return { text: "Fully booked this month", class: "booked" }
  if (available / total > 0.5)
    return { text: isCurrentMonth ? "Open for new projects" : "Good availability", class: "available" }
  return { text: "Limited availability", class: "busy" }
})

const legend = [
  { label: "Available", class: "available" },
  { label: "Limited",   class: "busy"      },
  { label: "Booked",    class: "booked"    },
]
</script>

<style scoped>
.calendar {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  padding: 28px;
  font-family: var(--font-sans);
  width: 100%;
  max-width: 360px;
  transition: background 0.4s ease, border-color 0.4s ease;
}

.cal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.overline {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-secondary);
  transition: color 0.4s ease;
}

.cal-nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cal-month {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 0.04em;
  min-width: 120px;
  text-align: center;
  transition: color 0.4s ease;
}

.nav-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease;
  padding: 0;
}

.nav-btn:hover:not(:disabled) {
  border-color: var(--gold);
  color: var(--gold);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn svg { width: 14px; height: 14px; }

.cal-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 6px;
}

.cal-weekdays span {
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding: 4px 0;
  transition: color 0.4s ease;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 2px;
}

.cell.empty { background: transparent; }

.cell-num {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1;
  transition: color 0.4s ease;
}

.cell.past .cell-num   { color: var(--text-faint); }
.cell.today .cell-num  {
  color: var(--gold);
  font-weight: 500;
}

.cell-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cell.available .cell-dot { background: #7a9e6a; }
.cell.busy      .cell-dot { background: #c9a96e; }
.cell.booked    .cell-dot { background: var(--border-mid); }
.cell.past      .cell-dot { display: none; }

.cell.today {
  background: color-mix(in srgb, var(--gold) 8%, transparent);
  outline: 1px solid color-mix(in srgb, var(--gold) 30%, transparent);
}

.legend {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
  transition: color 0.4s ease;
}

.legend-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-dot.available { background: #7a9e6a; }
.legend-dot.busy      { background: #c9a96e; }
.legend-dot.booked    { background: var(--border-mid); }

.status-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.status-banner .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  animation: pulse 2.4s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

.status-banner.available {
  background: color-mix(in srgb, #7a9e6a 10%, transparent);
  border: 1px solid color-mix(in srgb, #7a9e6a 25%, transparent);
  color: #7a9e6a;
}

.status-banner.available .status-dot { background: #7a9e6a; }

.status-banner.busy {
  background: color-mix(in srgb, var(--gold) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--gold) 25%, transparent);
  color: var(--gold);
}

.status-banner.busy .status-dot { background: var(--gold); }

.status-banner.booked {
  background: color-mix(in srgb, var(--border-mid) 20%, transparent);
  border: 1px solid var(--border-subtle);
  color: var(--text-faint);
}

.status-banner.booked .status-dot { background: var(--border-mid); }
</style>