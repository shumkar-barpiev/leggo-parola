# LeggoParola 🇮

**LeggoParola** is an interactive Italian language learning web application designed to help learners acquire Italian naturally through reading in context. By combining realistic conversations and short stories with instant word-by-word lookups and sentence translations, LeggoParola enables comprehensible input at any proficiency level.

---

## Features

### Interactive Dialogue Practice
- **Turn-by-Turn Conversations:** Read authentic Italian dialogues across real-world situations (daily routines, dining out, emergencies, family, public spaces, and more).
- **Speaker Avatars:** Color-coded speaker badges for easy visual tracking of conversations.
- **Collapsible Dialogue Details:** View level, topic, participant list, and language pairs at a glance.

### Short Story Reader
- **Continuous Prose Reading:** Read engaging short stories structured into clear paragraphs and sentences.
- **Reading Metrics:** Displays word count, CEFR proficiency level, topic, and estimated reading time.

### Contextual Translation Tools
- **Word-Level Popover:** Tap or click any Italian word in a dialogue or story to reveal its English translation and contextual meanings.
- **Sentence-Level Translation:** Toggle full sentence or dialogue line translations with a single click to verify comprehension.
- **Keyboard Accessible:** Navigate interactive words and triggers seamlessly using keyboard controls.

### Filter & Search System
- **Real-Time Search:** Instantly filter dialogues and stories by title.
- **CEFR Level Filtering:** Filter content by difficulty level (**A1**, **A2**, **B1**, **B2**, **C1**, **C2**).
- **Topic Filtering:** Filter stories by specific categories and themes.
- **Client-Side Pagination:** Smooth paginated browsing with active filter summary chips and quick reset options.

### Modern UI & Theming
- **Dark & Light Mode:** Built-in theme switcher with automatic system preference detection and zero hydration flicker.
- **Responsive Design:** Optimized layout for mobile phones, tablets, and desktop displays.
- **Material UI Design System:** Clean, modern interface powered by Material UI (MUI v9) and Tailwind CSS.

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components & Static Site Generation)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **UI Components:** [Material UI (MUI v9)](https://mui.com/) (`@mui/material`, `@mui/icons-material`, `@mui/material-nextjs`, `@emotion/react`, `@emotion/styled`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & MUI Emotion Theme Engine
- **Typography:** [Geist](https://vercel.com/font) (`next/font/google`)

---

## Project Structure

```text
leggo-parola/
├── app/
│   ├── components/
│   │   ├── common/              # Shared UI badges (ContentTypeBadge)
│   │   ├── dialogue/            # Dialogue cards, lists, library view, and dialogue lines
│   │   ├── layout/              # Navigation header and dark/light theme toggle
│   │   ├── reader/              # Core reading engine (Word, Popover, SentenceTranslation, Readers)
│   │   └── story/               # Story cards, lists, and library view
│   ├── dialogues/
│   │   ├── [id]/page.tsx        # Dynamic dialogue reader page
│   │   └── page.tsx             # Dialogue library page with search and level filters
│   ├── stories/
│   │   ├── [storyId]/page.tsx   # Dynamic story reader page
│   │   └── page.tsx             # Story library page with search, level, and topic filters
│   ├── lib/
│   │   ├── dialogues.ts         # Dialogue data loaders and query utilities
│   │   ├── renderInteractiveText.tsx # Text parser mapping words to interactive components
│   │   └── stories.ts           # Story data loaders and query utilities
│   ├── src/data/
│   │   ├── dialogues/           # Structured JSON datasets for dialogues (organized by CEFR level)
│   │   └── stories/             # Structured JSON datasets for stories
│   ├── types/
│   │   ├── dialogue.ts          # TypeScript interfaces for dialogues, lines, and words
│   │   └── story.ts             # TypeScript interfaces for stories, paragraphs, and sentences
│   ├── globals.css              # Global styles and Tailwind directives
│   ├── layout.tsx               # Root layout with ThemeProvider and CssBaseline
│   ├── page.tsx                 # Home landing page with featured stories & dialogues
│   └── theme.ts                 # MUI theme definition with light and dark color schemes
├── AGENTS.md                    # Agent workflow guidelines
├── package.json
└── README.md
```

---

## Data Schema

All dialogues and stories are stored as structured JSON datasets in `app/src/data/`.

### Dialogue Structure
```typescript
interface Dialogue {
  id: string;
  title: string;
  description: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  topic: string;
  sourceLanguage: string;
  translationLanguage: string;
  lines: {
    id: string;
    speaker: string;
    text: string;
    translation: string;
    words: { text: string; translation: string[] }[];
  }[];
}
```

### Story Structure
```typescript
interface Story {
  id: string;
  title: string;
  description: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  topic: string;
  sourceLanguage: string;
  translationLanguage: string;
  wordCount: number;
  estimatedReadingMinutes: number;
  paragraphs: {
    id: string;
    sentences: {
      id: string;
      text: string;
      translation: string;
      words: { text: string; translation: string[] }[];
    }[];
  }[];
}
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shumkar-barpiev/leggo-parola.git
   cd leggo-parola
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot reloading |
| `npm run build` | Compiles the production build |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Runs ESLint to check for code quality and linting issues |

