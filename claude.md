# Bash commands

- npm run dev: Start development server
- npm run build: Build for production
- npm run typecheck: Run TypeScript checking
- npm run lint: Run ESLint

# Code style

- ES modules (import/export), destructure imports when possible
- TypeScript for all files, avoid 'any' type

# React/Next.js essentials

- Server components by default, "use client" only when needed
- next-intl for ALL user text, custom Link from @/navigation
- Handle Sanity loading/error states

# Project specifics

- Sanity types: typing.d.ts, queries: sanity/lib/queries.ts
- UI components from @/components/ui, FadeUp/MaskText for animations
- useGetLocale() hook for current locale

# Workflow

- Typecheck after code changes, test Swedish/English locales
- Check responsive design, build before committing
- Conventional Commits in English: type: description
- Use barrel exports (index.ts) for cleaner imports

# Commit messages

- Use Conventional Commits format: type: description
- Write in English even when communicating in Swedish
- Common types: feat, fix, docs, style, refactor, test, chore, wip
