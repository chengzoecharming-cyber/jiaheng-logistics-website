# Agent Guidelines for 嘉亨物流官网

This document helps AI agents work effectively in this repository.

## Tech Stack

- **Build Tool**: Vite 6
- **Frontend**: React 19 + TypeScript 5.8
- **Styling**: Tailwind CSS v4 (CSS-based config)
- **UI Library**: shadcn/ui with `@base-ui/react` primitives ("base-nova" style)
- **Icons**: Lucide React
- **Animation**: Motion (Framer Motion successor)

## Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check only (no ESLint/Prettier configured)
npm run lint

# Clean build artifacts
npm run clean
```

> **Note**: There is currently no test framework installed. If adding tests, install a runner like Vitest and document the single-test command here (e.g. `npx vitest run src/path/to/file.test.ts`).

## Project Structure

```
src/
  App.tsx          # Main application page
  main.tsx         # React root entry
  index.css        # Tailwind v4 theme, CSS variables, global styles
components/
  ui/              # shadcn/ui components (buttons, dialogs, cards, etc.)
lib/
  utils.ts         # `cn()` helper for Tailwind class merging
```

## Code Style Guidelines

### Imports

- Use path alias `@/` for all project imports (e.g. `@/components/ui/button`, `@/lib/utils`).
- Import React hooks explicitly: `import { useState, useEffect } from "react"`.
- Group imports in this order, separated by a blank line:
  1. React / framework imports
  2. Third-party libraries (motion, lucide-react)
  3. Local UI components (`@/components/ui/...`)
  4. Local utilities (`@/lib/...`)

### Formatting

- Use TypeScript with strict mode (`strict: true` implied by `tsc --noEmit`).
- Files are `.tsx` for components and `.ts` for utilities.
- Component files use **function declarations** (not arrow functions) for the main export.
- Use `type` keyword when importing types (e.g. `import { cva, type VariantProps } from "class-variance-authority"`).
- Trailing commas are acceptable in arrays/objects.

### Naming Conventions

- Components: PascalCase (e.g. `Button`, `DialogContent`).
- Props interfaces: Use the primitive type directly (e.g. `DialogPrimitive.Popup.Props`) rather than custom `IProps` names.
- Utility functions: camelCase (e.g. `cn`).
- Constants: UPPER_SNAKE_CASE for module-level const arrays/objects (e.g. `NAV_LINKS`, `SERVICES`).
- File names: kebab-case for UI components (`dialog.tsx`, `scroll-area.tsx`).

### Types

- Prefer explicit prop typing using library primitive types (e.g. `DialogPrimitive.Root.Props`, `React.ComponentProps<"div">`).
- For component variants, use `cva` + `VariantProps<typeof variantName>`.
- The project uses ES modules (`"type": "module"`).

### Tailwind & Styling

- **Always use the `cn()` utility** from `@/lib/utils` when composing class names conditionally.
- Tailwind v4 config lives entirely in `src/index.css` via `@theme` and `@layer`.
- Use CSS variables for theming (`bg-primary`, `text-foreground`, `border-border`).
- Large radius values are common in this design: `rounded-[2.5rem]`, `rounded-3xl`, `rounded-full`.
- Prefer `font-display` for headings and `font-sans` for body text.

### Error Handling

- Use non-null assertions sparingly (existing pattern: `document.getElementById('root')!`).
- Avoid `any`. Use `unknown` if a type is truly dynamic.
- No global error boundary currently exists; handle errors at the component level.

## Special Rules

1. **Do not modify HMR logic**: `vite.config.ts` contains server-side HMR guards for AI Studio (`DISABLE_HMR`). Leave this unchanged.
2. **shadcn/ui components** are built on `@base-ui/react` primitives. When extending UI components, follow the existing pattern of wrapping primitives, adding `data-slot` attributes, and exporting named functions.
3. **No ESLint or Prettier** is configured. Rely on `npm run lint` (TypeScript compiler) to catch type errors. Keep code consistent with existing file styles.
4. Environment variables are loaded via Vite's `loadEnv`. `GEMINI_API_KEY` and `APP_URL` are expected in `.env`.

## Adding New shadcn/ui Components

If adding a new UI component, place it in `components/ui/` and follow these conventions:

- Wrap `@base-ui/react` primitives.
- Use `cn()` for all `className` composition.
- Export named functions (not default exports) so they can be tree-shaken.
- Add `data-slot` attributes for consistency.
