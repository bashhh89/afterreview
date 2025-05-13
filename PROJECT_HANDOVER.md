# Project Handover Document: Social Garden AI Efficiency Scorecard & Learning Hub

This document provides an overview of the Social Garden AI Efficiency Scorecard and Learning Hub project, intended for developers who will be working on the codebase.

## 1. Project Overview

The Social Garden AI Efficiency Scorecard is a Next.js application designed to assess an organization's AI readiness through a multi-phase questionnaire. It generates a personalized report with key findings, recommendations, and a learning path. The integrated Learning Hub provides educational resources, including mini-courses and templates, related to AI adoption and efficiency.

## 2. Technical Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Frontend:** React
*   **Styling:** Tailwind CSS
*   **AI Integration:** Pollinations.AI (used for AI processing, e.g., report generation)
*   **Data Management:** Markdown files for content (`content/`), data structures in `lib/learningHubData.ts`, potential future integration with databases/APIs (e.g., Firebase).
*   **Markdown Rendering:** `react-markdown` with `remark-gfm` and `rehype-raw`.
*   **Package Manager:** pnpm

## 3. Project Structure

Key directories and their purpose:

*   `app/`: Contains application routes and pages. Dynamic routes like `app/learning-hub/course/[id]/page.tsx` and `app/learning-hub/templates/[id]/page.tsx` handle displaying individual courses and templates. API routes are in `app/api/`.
*   `components/`: Reusable React components, organized by feature area (e.g., `components/scorecard/`, `components/learning-hub/`).
*   `lib/`: Utility functions and libraries, including data definitions (`learningHubData.ts`), markdown processing (`markdownUtils.ts`), and AI provider integration (`ai-providers.ts`).
*   `content/`: Markdown files for mini-course and template content.
*   `public/`: Static assets (images, etc.).

## 4. Key Features

*   **AI Efficiency Scorecard:** Multi-phase assessment, dynamic questioning, AI "thinking" display, personalized report generation (Overall Tier, Key Findings, Action Plan, Benchmarks).
*   **Learning Hub:** Collection of mini-courses and templates on AI topics.
*   **Dynamic Content Rendering:** Courses and templates are rendered from markdown files.
*   **Interactive Elements:** Some components include interactive features (e.g., the step-by-step display for quick wins).
*   **Lead Capture:** (Planned) Integration for capturing user information.
*   **PDF Export:** (Planned) Functionality to download reports as PDFs.

## 5. Data Flow

*   Learning Hub content is primarily sourced from markdown files in the `content/` directory.
*   Metadata about courses and templates is defined in `lib/learningHubData.ts`.
*   Markdown content is fetched and processed using functions in `lib/markdownUtils.ts`.
*   AI processing for report generation is handled via API routes (`app/api/scorecard-ai/route.ts`) interacting with the Pollinations.AI service.

## 6. Styling

*   The project uses Tailwind CSS for utility-first styling.
*   Brand colors (sg-dark-teal, sg-bright-green, sg-light-mint) are defined and used throughout the components.
*   The primary font is Plus Jakarta Sans, applied globally in `app/layout.tsx`.
*   Markdown content is styled using the `@tailwindcss/typography` plugin (`prose` classes).

## 7. Setup and Running

1.  **Clone the repository:** `git clone [repository_url]`
2.  **Navigate to the project directory:** `cd [project_directory]`
3.  **Install dependencies:** `pnpm install`
4.  **Set up environment variables:** Copy `.env.local.example` to `.env.local` and configure necessary variables (e.g., API keys).
5.  **Run the development server:** `pnpm dev`
6.  Access the application at `http://localhost:3000` (or the configured port).

## 8. Important Notes

*   The project uses Next.js App Router with a mix of Server and Client Components. Components using React Hooks (like `useState`, `useEffect`) must be marked with `"use client";` at the top of the file.
*   Dynamic routes (`[id]`, `[slug]`) are used for courses and templates.
*   Markdown content is parsed and rendered dynamically. Be mindful of the expected markdown structure when adding new content.
*   The project is under active development, and some features (like full PDF export and lead capture) may still be in progress or require further implementation.

This document provides a starting point for understanding the project. Refer to the codebase and existing documentation (like `APIDOCS.md`, `README.md`) for more detailed information.
