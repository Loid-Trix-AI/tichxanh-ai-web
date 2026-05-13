# 🤝 Contributing to TichXanh AI

We're excited that you're interested in contributing to TichXanh AI! As a project built on **SOLID** principles and high-polish UI, we maintain strict standards to ensure the best possible experience for our users and developers.

---

## 🛠️ Development Workflow

1. **Fork & Clone:** Fork the repo and clone it locally.
2. **Setup:** Use `pnpm install` to install dependencies.
3. **Branching:** Create a descriptive branch (e.g., `feat/new-animation` or `fix/i18n-typo`).
4. **Develop:** Run `pnpm dev` to see your changes in real-time.
5. **Quality Check:** 
   - Run `pnpm lint` to check for style issues.
   - Run `pnpm format` to auto-format your code.
6. **Commit:** Follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat(ui): add new bubble variant`).

---

## 🏗️ Architectural Guidelines (SOLID)

We follow a strictly layered architecture. Please ensure your contributions fit into the correct layer:

- **`src/core`**: Global services, shared types, and business logic. No UI code.
- **`src/features`**: Self-contained domain features (e.g., `landing`, `auth`). Keep business logic in local hooks or services.
- **`src/shared`**: Reusable UI components (`Navbar`, `Button`), hooks, and utilities.
- **`src/routes`**: TanStack Router definitions. Keep components here minimal; delegate to `features`.

### Rules to Follow:
- **Single Responsibility:** Each component or function should do one thing.
- **DRY:** Never duplicate logic. If it's used in two places, move it to `shared`.
- **Performance:** Use `useMemo` and `useCallback` where appropriate, especially when dealing with GSAP or Framer Motion.

---

## 🎨 UI/UX Standards

- **Mobile First:** All new components must be fully responsive.
- **Micro-interactions:** Add subtle hover/scroll animations using Framer Motion or GSAP.
- **Color Space:** Use `oklch()` for colors to ensure consistency in Tailwind CSS v4.
- **i18n:** Never hardcode strings. Add keys to `src/locales/en.json` and `vi.json`.

---

## 📝 Reporting Issues

If you find a bug or have a feature request, please open an issue with:
1. A clear, descriptive title.
2. Steps to reproduce the bug.
3. Expected vs. Actual behavior.
4. Screenshots or recordings (if visual).

---

Thank you for helping us build a more sustainable future with **Loid AI**! 🌍
