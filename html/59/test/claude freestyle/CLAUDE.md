# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static single-page website for "ESTUFF — A PCS company", a fictional store with three departments (Computers, Choirs, Candy). It lives inside a larger class-exercises repo (repo root: `C:\xampp2\htdocs\class`, organized as `html/<class-number>/`; commits are named `class NN`). This folder is the class-59 freestyle exercise.

## Running

No build, lint, or test tooling — plain HTML/CSS/JS. Serve via the local XAMPP Apache install and open:

```
http://localhost/class/html/59/freestyle/
```

(Opening `index.html` directly as a file also works.)

## Structure

- `index.html` — the entire page: nav, hero, three product "aisle" cards (inline SVG illustrations), sign-up form, financials table, about section. The sign-up form is validated client-side by a small inline `<script>` at the bottom; it does not post anywhere.
- `styles.css` — all styling. Design tokens are CSS custom properties on `:root`; keep new colors/spacing derived from those tokens rather than hardcoding hex values in rules.

## Design system

The page follows a deliberate "vibrant block-based storefront" direction — preserve it when editing:

- Each department has its own color identity used consistently across its card tag, illustration, shadow, and link: Computers = slate (`--machleket-machshevim`), Choirs = indigo (`--machleket-makhelot`), Candy = pink (`--machleket-mamtakim`). Global palette: mint paper background (`--niyar`), deep green ink (`--dyo`), orange CTAs (`--katom`).
- Type: Rubik for display/UI, Nunito Sans for body (loaded from Google Fonts — the only external dependency).
- Hard offset box-shadows and 2px ink borders are the signature look; don't swap in soft blurred shadows.
- Accessibility floor already in place and expected of any change: visible keyboard focus, `prefers-reduced-motion` respected, 44px+ touch targets, 4.5:1 text contrast, wide content (the financials table) scrolls in its own container instead of the page.

## Project skills

`.claude/skills/` contains two project-local skills — use them for any UI/design work here:

- `frontend-design` — design process and quality guidance.
- `ui-ux-pro-max` — searchable design database; query it via `python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>` (see its SKILL.md).

## coding preferences

- css should be in a separate css file, not embedded in html file
- all css variables should use hebrew language words not english
