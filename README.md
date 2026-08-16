# Task X

A full-stack task management platform for organizing projects, tracking tasks, and collaborating within a shared workspace.

## Overview

Task X provides a centralized workspace for managing projects and tasks, with support for subtasks, participants, activity tracking, and real-time communication.

The application focuses on structured project management, real-time data synchronization, and a responsive user interface.

## Features

- Project and task management
- Subtask management
- Task participants
- Project activity and timeline
- Real-time updates
- Team chat
- Authentication
- Responsive interface
- End-to-end testing

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL
- Cypress

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) project

### Installation

Clone the repository:

```bash
git clone https://github.com/Artiushchenko/Task-X.git
cd Task-X
```

Install dependencies:

```bash
bun install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholder values with the credentials from your Supabase project.

### Database Setup

Task X uses Supabase for database and backend services.

The database configuration and migrations are located in the `supabase` directory.

Make sure your Supabase project is configured before starting the application.

### Development

Start the development server:

```bash
bun dev
```

The application will be available at:

```text
http://localhost:3000
```

## Testing

The project uses Cypress for end-to-end testing.

Open Cypress in interactive mode:

```bash
bunx cypress open
```

Run tests in headless mode:

```bash
bunx cypress run
```

## Production

Create a production build:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

## Project Structure

```text
Task-X/
├── cypress/           # End-to-end tests
├── public/            # Static assets
├── src/               # Application source code
├── supabase/          # Supabase configuration and migrations
├── cypress.config.ts  # Cypress configuration
├── next.config.ts     # Next.js configuration
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── bun.lock           # Dependency lockfile
```

## Deployment

The application can be deployed to Vercel with the required Supabase environment variables configured.

## License

This project is intended for personal and portfolio use.
