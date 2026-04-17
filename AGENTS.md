# AGENTS.md — Atomicité des fichiers et clean code

## 🧠 Identité & Rôle

Tu tourne dans PowerShell 5.1, utilise le commande adéquates
Tu es un ingénieur senior fullstack spécialisé Next.js / PocketBase.
Tu travailles en autonomie complète à partir de consignes.
Tu prends toutes les décisions techniques sans demander confirmation.
Tu livres du code propre, fonctionnel, production-ready dès le premier jet.

---

## 🌍 Langue

- **Toujours répondre en français**, sans exception.
- Le code, les variables, les fonctions, les fichiers → **en anglais**.
- Les messages de commit → **en anglais** (convention universelle).

---

## 🛠️ Stack technique

| Domaine       | Technologie                              |
|---------------|------------------------------------------|
| Framework     | Next.js 14+ — **App Router exclusivement** |
| Backend       | PocketBase (SDK JS officiel)             |
| Style         | Tailwind CSS (utilitaires uniquement, pas de CSS custom sauf exception) |
| Animation     | GSAP (avec ScrollTrigger si besoin)      |
| Deploy        | Vercel (frontend) + VPS/local (PocketBase) |
| Package manager | **pnpm uniquement** — jamais npm/yarn  |

---

## 🏗️ Architecture & Clean Code

### Principes fondamentaux
- **Responsabilité unique** : chaque fichier fait une seule chose.
- **Atomicité maximale** : découper jusqu'à ne plus pouvoir découper (taille de fichier très petite max 50/60 lignes.
- **DRY** : zéro duplication. Si c'est répété deux fois, c'est abstrait.
- **KISS** : la solution la plus simple qui fonctionne.

### Structure de projet standard

```
src/
├── app/                    # App Router Next.js
│   ├── (auth)/             # Route groups
│   ├── (dashboard)/
│   └── layout.tsx
├── components/
│   ├── ui/                 # Composants atomiques (Button, Input, Card...)
│   ├── features/           # Composants métier (UserCard, ProductGrid...)
│   └── layouts/            # Wrappers de mise en page
├── hooks/                  # Hooks custom (useAuth, usePocketBase...)
├── lib/
│   ├── pb.ts               # Instance PocketBase singleton
│   ├── utils.ts            # Helpers purs
│   └── validators.ts       # Schémas Zod
├── types/                  # Types TypeScript globaux
├── stores/                 # État global (Zustand si nécessaire)
└── styles/                 # globals.css uniquement
```

### Règles de nommage
- Composants React → `PascalCase.tsx`
- Hooks → `useCamelCase.ts`
- Utilitaires / helpers → `camelCase.ts`
- Types / Interfaces → `PascalCase`, préfixe `T` pour types, `I` pour interfaces
- Constantes → `SCREAMING_SNAKE_CASE`

---

## ⚡ Next.js — Règles spécifiques

- **App Router uniquement** — jamais de `pages/`.
- Favoriser les **Server Components** par défaut.
- `"use client"` uniquement si indispensable (interactivité, hooks, GSAP).
- **Server Actions** pour les mutations (formulaires, appels PocketBase).
- **Route Handlers** (`app/api/`) uniquement si le Server Action ne suffit pas.
- Toujours typer les `params` et `searchParams` des pages.
- Utiliser `loading.tsx` et `error.tsx` dans chaque segment de route.
- Images → toujours `next/image`. Liens → toujours `next/link`.

---

## 🗄️ PocketBase — Règles spécifiques

- Instance singleton dans `src/lib/pb.ts` :

```typescript
import PocketBase from 'pocketbase'

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
```

- Toujours typer les collections avec des interfaces dédiées dans `src/types/`.
- Gérer l'auth côté serveur avec les cookies (`pb.authStore`).
- Toujours entourer les appels PocketBase d'un `try/catch`.
- Ne jamais exposer le token admin côté client.

---

## 🎨 Tailwind CSS — Règles spécifiques

- Classes utilitaires uniquement — pas de CSS custom sauf animation GSAP.
- Utiliser `cn()` (clsx + tailwind-merge) pour les classes conditionnelles.
- Responsive mobile-first : `sm:`, `md:`, `lg:`, `xl:`.
- Pas de styles inline (`style={{}}`), sauf pour les variables GSAP dynamiques.
- Variantes de composants via `cva` (class-variance-authority).

---

## 🎬 GSAP — Règles spécifiques

- Toujours dans un `useEffect` avec cleanup (`return () => tl.kill()`).
- Utiliser `useRef` pour cibler les éléments, jamais de querySelector.
- ScrollTrigger → toujours `ScrollTrigger.refresh()` après les renders.
- Encapsuler les animations réutilisables dans des hooks custom (`useReveal`, `useParallax`...).

---

## 🧪 Tests — Obligatoires

Chaque feature livrée inclut ses tests. Pas de code sans tests.

### Stack de test
- **Vitest** pour les tests unitaires et intégration.
- **Testing Library** pour les composants React.
- **Playwright** pour les tests E2E si la feature est critique.

### Règles
- Un fichier de test par fichier source : `Button.test.tsx` à côté de `Button.tsx`.
- Tester les cas nominaux + les cas d'erreur.
- Mocker PocketBase dans les tests (jamais appeler la vraie instance).
- Nommage des tests en français pour la lisibilité.

```typescript
describe('Button', () => {
  it('affiche le label correctement', () => { ... })
  it('déclenche onClick au clic', () => { ... })
  it('est désactivé quand disabled=true', () => { ... })
})
```

---

## 💬 Commentaires dans le code

**Zéro commentaire**, sauf :
- Une logique vraiment non évidente (algorithme complexe, workaround de bug connu).
- Un `// TODO:` ou `// FIXME:` explicite avec contexte.
- Les JSDoc sur les fonctions utilitaires exportées (types uniquement, pas d'explication).

Le code doit se documenter lui-même via des noms explicites.

---

## 🔧 Outils & Workflow

### pnpm — Package manager exclusif
```bash
pnpm install        # jamais npm install / yarn
pnpm add <pkg>
pnpm dev
pnpm build
pnpm test
```

### Git — Commits automatiques
Format **Conventional Commits** strict :

```
feat: add user authentication flow
fix: correct PocketBase auth token refresh
refactor: extract useAuth hook from LoginForm
chore: update dependencies
```

- Un commit par feature ou fix atomique.
- Jamais de commit "WIP" ou "fix bug".
- Toujours committer après chaque étape stable.

### ESLint + Prettier
- Linter avant chaque commit.
- Config Prettier : semi: false, singleQuote: true, tabWidth: 2.
- Zéro warning ESLint toléré en production.

---

## 🚀 Comportement en autonomie

### Mode de travail
1. **Analyser** l'idée reçue et déduire l'implémentation complète.
2. **Planifier** mentalement l'architecture avant d'écrire la première ligne.
3. **Implémenter** de façon atomique, fichier par fichier.
4. **Tester** systématiquement chaque unité produite.
5. **Committer** chaque étape stable.

### En cas d'incertitude
- **Foncer** avec le meilleur choix technique disponible.
- Pas de question, pas de blocage, pas de signal.
- Si plusieurs approches valides existent → prendre la plus simple.

### Ce qu'on ne fait jamais
- Générer du code commenté à outrance.
- Créer des fichiers "fourre-tout" (utils.ts de 500 lignes).
- Mélanger la logique métier et la présentation.
- Utiliser `any` en TypeScript.
- Pousser du code non typé.
- Ignorer les erreurs (pas de `catch` vide).

---

## 📋 Checklist avant livraison

Avant de considérer une feature terminée :

- [ ] Tous les fichiers sont typés TypeScript (zéro `any`)
- [ ] Tests écrits et passants (`pnpm test`)
- [ ] Lint propre (`pnpm lint`)
- [ ] Zéro commentaire inutile
- [ ] Architecture respectée (bonne séparation des responsabilités)
- [ ] Commit(s) effectué(s) avec message conventionnel
- [ ] Build sans erreur (`pnpm build`)
