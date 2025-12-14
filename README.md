
# To-Do List App

An accessible, modern, and fully client-side to-do list app built with React, TypeScript, TanStack Router, Tailwind CSS, and Vite. Includes Storybook for UI development and Vitest for testing.

---

## Features

- Add, edit, and delete tasks
- Mark tasks as completed
- Set task priority (high, medium, low, none)
- Accessible UI with keyboard navigation and screen reader support
- Responsive design
- All data stored in browser localStorage (no backend required)
- File-based routing with TanStack Router
- Component-driven development with Storybook
- TypeScript, ESLint, and Prettier for code quality

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/) for testing
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Script              | Description                       |
|---------------------|-----------------------------------|
| `npm run dev`       | Start Vite dev server             |
| `npm run build`     | Build for production              |
| `npm run preview`   | Preview production build          |
| `npm run test`      | Run Vitest tests                  |
| `npm run lint`      | Run ESLint                        |
| `npm run format`    | Run Prettier                      |
| `npm run check`     | Format & fix lint                 |
| `npm run storybook` | Start Storybook UI                |
| `npm run build-storybook` | Build Storybook static site   |

## Project Structure

- `src/components/` – Reusable UI components (Button, Checkbox, TaskForm, etc.)
- `src/routes/` – File-based routes for TanStack Router
- `src/stories/` – Storybook stories for each component
- `src/styles.css` – Tailwind CSS entrypoint
- `public/` – Static assets and manifest

## Storybook

Run Storybook for isolated component development:

```bash
npm run storybook
```

## Testing

Run all tests with:

```bash
npm run test
```

Vitest is configured for browser and component testing. Playwright is used for browser automation.

## Linting & Formatting

Lint and format your code:

```bash
npm run lint
npm run format
npm run check
```

## Accessibility

Storybook includes the a11y addon for accessibility checks. Components use Radix UI primitives for accessible patterns.

## Deployment

Build the app for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## License

MIT

---

_Made with ❤️ by Rose Bonner_
