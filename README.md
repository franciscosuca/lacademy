# L'Academy Engineering Hub

L'Academy Engineering Hub is a React + TypeScript learning dashboard for exploring technical documentation and studying it with interactive tools.

The app includes:

- Structured documentation navigation
- Upload and load custom `.md` or `.pdf` documentation
- Study notes with local persistence
- AI-generated flashcards
- AI-generated quiz questions
- AI-powered note summaries

## Tech Stack

- React 19 + TypeScript
- Vite
- Express (API server)
- Google GenAI SDK
- Tailwind CSS

## Prerequisites

- Node.js 20+
- npm
- A valid Gemini API key

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an environment file (for local development):

   ```bash
   cp .env.example .env
   ```

3. Add your Gemini API key in .env:

   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app:
   <http://localhost:3000>

## Environment Variables

- GEMINI_API_KEY: Required for AI endpoints
- APP_URL: Optional app base URL for deployments and callback-style integrations

See .env.example for a template.

## Project Structure

- src/: Frontend application code
- src/components/: UI components (sidebar, content, quiz, flashcards)
- server.ts: Express server and API endpoints
- hackathon_boring_dense_valves_doc.md: Source documentation used by the app
- metadata.json: Project metadata

## Notes

- Notes are persisted in browser localStorage under academy-notes.
- AI features call server endpoints that require GEMINI_API_KEY.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
