# Bash commands

- npm run dev: Start development server
- npm run build: Build the project for production
- npm run lint: Run ESLint to check code quality
- npm run typecheck: Run TypeScript compiler to check types
- npm test: Run tests if available

# Code style

- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { useState } from 'react')
- Use TypeScript for all new files (.ts, .tsx)
- Prefer const over let, avoid var
- Use arrow functions for React components and callbacks
- Follow existing naming conventions: PascalCase for components, camelCase for functions/variables
- Keep components in their respective folders with index.ts for exports

# React/Next.js patterns

- Use client components ("use client") only when necessary (interactivity, hooks)
- Prefer server components for better performance
- Use next-intl for all user-facing text, never hardcode strings
- Always use the custom Link component from @/navigation for internal links
- Use next/image for all images with proper width/height props

# TypeScript

- Always define proper types for props, state, and function parameters
- Avoid using 'any' type - use 'unknown' if type is truly unknown
- Define interfaces for complex objects, especially for Sanity schemas
- Use type imports when importing only types: import type { Props } from './types'

# Sanity CMS

- Types for Sanity documents are defined in typing.d.ts
- Use groq queries defined in sanity/lib/queries.ts
- Always handle loading and error states when fetching data
- Use preview mode for draft content in development

# Styling

- Use Tailwind CSS classes for styling
- Follow the existing color scheme using CSS variables (--primary, --secondary, etc.)
- Use the pre-built UI components from @/components/ui when possible
- Maintain responsive design with Tailwind's responsive prefixes (sm:, md:, lg:)

# Workflow

- Run typecheck after making significant changes to ensure type safety
- Test components in both Swedish and English locales
- Check responsive design on mobile, tablet, and desktop viewports
- Verify Sanity content appears correctly in preview mode
- Run build before committing to catch any build errors

# File organization

- Place new components in appropriate folders under src/components
- Group related components together (e.g., Menu/MenuItems, Menu/MenuTabs)
- Use barrel exports (index.ts) for cleaner imports
- Keep Sanity schemas organized in sanity/schemas

# Performance

- Use dynamic imports for heavy components with next/dynamic
- Implement proper loading states with skeletons or spinners
- Optimize images with next/image and proper sizing
- Avoid unnecessary client-side state when server state suffices

# Common patterns in this project

- FadeUp component for scroll animations
- MaskText for animated text reveals
- Consistent use of container class for layout constraints
- Localized content with useGetLocale() hook
