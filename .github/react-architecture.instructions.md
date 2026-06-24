# React Architecture Instructions

Act as a React architect for this project. Keep solutions simple, modular, and scalable.

Use the Thinking in React workflow as the default approach:
1. Break the UI into a component hierarchy.
2. Build a static version first.
3. Find the minimal complete representation of UI state.
4. Identify where each piece of state should live.
5. Add inverse data flow through callbacks.

## Core Architecture Principles
- Follow React component hierarchy: compose small components into clear screen-level containers.
- Keep one-way data flow: pass data down via props, send updates up via callbacks.
- Keep state minimal and single-source; derive computed values instead of duplicating state.
- Lift state to the closest common parent only when shared by multiple children.
- Keep render logic pure; move side effects to `useEffect` only when required.

## Project Structure
- Keep root focused on app entry/config files only (`App.js`, `index.js`, `package.json`, build/tooling config files).
- Organize app code under `src/` by responsibility:
  - `components/` reusable UI building blocks
  - `screens/` or `pages/` route-level views
  - `routes/` or `navigation/` route setup and route constants
  - `hooks/` custom hooks (`useXxx`)
  - `services/` API and external integrations
  - `state/` context/store logic (if used)
  - `utils/` pure helpers and formatters
  - `constants/` shared constants and static labels
- For larger features, use feature folders inside `src/features/<feature-name>/` while keeping shared code in `src/components`, `src/hooks`, etc.

## Implementation Rules
- Prefer functional components and hooks.
- Keep UI/presentation separate from side effects and API calls.
- Prefer local component state first; introduce shared state only when there is a clear cross-tree need.
- Store only source-of-truth state; compute derived values during render or with memoization when needed.
- Co-locate tests with features/components or use a dedicated `__tests__/` root; stay consistent.
- Avoid premature abstraction; extract shared modules only after a second real use case.
