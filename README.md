<div align="center">

<br/>

# VueJS-Portfolio

**A refined, fully static portfolio — Vue 3, Vite, zero backend.**

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=42B883&center=true&vCenter=true&width=600&lines=Modern+Vue+3+Portfolio;Dark+Mode+%E2%9C%A8+Responsive+Design;Interactive+%26+No+Backend+Required" alt="Typing SVG" />

<br/>

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-42B883?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

<br/>

> *A sleek, performant, fully static portfolio — built to impress.*

</div>

---

## ◈ Overview

**VueJS-Portfolio** is a handcrafted personal portfolio built with **Vue 3** and **Vite**. It showcases projects, skills, and personality through a refined UI complete with dark mode, fluid animations, and responsive layouts — zero backend, zero compromise.

<br/>

## ◈ Feature Highlights

<table>
<tr>
<td width="50%">

**🌙 Dark Mode**
Smooth, system-aware theme toggling with persistent state — light and dark, both polished.

**📱 Responsive Design**
Pixel-perfect across all breakpoints. Mobile-first, desktop-refined.

**🃏 Skill Cards**
Interactive, animated cards that bring your tech stack to life.

</td>
<td width="50%">

**💼 Project Showcase**
Clean project layouts with descriptions, tags, and live/repo links.

**⚡ Vite Powered**
Instant HMR, lightning builds, and optimized production output.

**🧩 Composition API**
Built with `<script setup>` — clean, composable, and modern.

</td>
</tr>
</table>

<br/>

## ◈ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| 🖼️ Framework | Vue.js | 3.x |
| ⚡ Build Tool | Vite | Latest |
| 🎨 Styling | CSS3 / Variables | Modern |
| 🔀 Routing | Vue Router | 4.x |
| 📦 Package Manager | npm | Latest |

<br/>

## ◈ Project Structure

```
VueJS-Portfolio/
│
├── 📁 public/                  # Static assets (favicon, og image)
│
├── 📁 src/
│   ├── 📁 assets/              # Global styles, fonts, images
│   ├── 📁 components/
│   │   ├── 🧩 Navbar.vue       # Navigation with dark mode toggle
│   │   ├── 🌙 DarkModeToggle.vue
│   │   ├── 🃏 SkillCard.vue
│   │   └── 💼 ProjectCard.vue
│   ├── 📁 views/               # Page-level components
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   └── ProjectsView.vue
│   ├── 🔀 router/index.js      # Route definitions
│   ├── 🌐 App.vue              # Root component
│   └── 🚀 main.js              # Entry point
│
├── 📄 index.html
├── ⚙️  vite.config.js
└── 📦 package.json
```

<br/>

## ◈ Getting Started

### Prerequisites

```bash
node --version   # v18+ recommended
npm --version    # v9+
```

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/Mazennaji/VueJS-Portfolio.git

# Navigate into the project
cd VueJS-Portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

🌐 Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

Output lands in `dist/` — ready to deploy anywhere.

<br/>

## ◈ Customization Guide

Make it yours in minutes:

| What to change | Where to look |
|----------------|--------------|
| Your name & bio | `src/views/HomeView.vue` |
| Projects list | `src/views/ProjectsView.vue` |
| Skills & stack | `src/components/SkillCard.vue` |
| Colors & fonts | `src/assets/main.css` (CSS variables) |
| Social links | `src/components/Navbar.vue` / footer |
| Favicon & OG image | `public/` |

<br/>

## ◈ Deployment

> This is a **fully static** app — deploy anywhere for free.

<table>
<tr>
<td align="center" width="33%">

**▲ Vercel**

```bash
vercel deploy
```
Connects to GitHub.
Auto-deploys on push.

</td>
<td align="center" width="33%">

**◆ Netlify**

Drop `dist/` folder or
connect your GitHub repo.
Done in 30 seconds.

</td>
<td align="center" width="33%">

**⬡ GitHub Pages**

```bash
npm run build
# push dist/ to gh-pages
```

</td>
</tr>
</table>

<br/>

## ◈ Roadmap

- [ ] Add blog / writing section
- [ ] Integrate EmailJS for contact form
- [ ] Page transition animations
- [ ] i18n multi-language support
- [ ] Lighthouse 100 audit pass

<br/>

## ◈ Contributing

Contributions are welcome! If you find a bug or have an idea:

1. Fork the repo
2. Create your branch — `git checkout -b feature/amazing-thing`
3. Commit — `git commit -m 'Add amazing thing'`
4. Push — `git push origin feature/amazing-thing`
5. Open a Pull Request

<br/>

## ◈ License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

<br/>

---

<div align="center">

**Made with ♥ by [Mazennaji](https://github.com/Mazennaji)**

*Vue 3 + Vite — Fast by default, beautiful by design.*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Mazennaji-181717?style=flat-square&logo=github)](https://github.com/Mazennaji)

</div>
