# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WillKi.dev is a personal blog/portfolio site with a Next.js 15 frontend, Express.js backend, and PostgreSQL database, containerized with Docker Compose.

## Development Commands

### Full Stack (Docker)
```bash
docker-compose up           # Start all services (client :3000, server :5000, db :5432)
docker-compose build        # Rebuild images
```

### Client (Next.js)
```bash
cd client
npm run dev     # Dev server on port 3000
npm run build   # Production build
npm run lint    # ESLint
npm start       # Production server
```

### Server (Express)
```bash
cd server
node index.js   # Run on port 5000
```

### Database Initialization
```bash
curl http://localhost:5000/api/initDB   # Creates tables if not exists
```

## Architecture

### Monorepo Structure
- `client/` — Next.js 15 / React 19 frontend
- `server/` — Express.js backend
- `postgreSQL/init.sql` — DB schema initialization
- `data/` — PostgreSQL persistent volume (Docker)

### Content System
Posts are **file-based** (no CMS):
- Metadata: `client/public/contents/postList.json` and `recommendedPostList.json`
- Content: `client/public/contents/[post-slug]/content.md` (Markdown with GFM, KaTeX math, syntax highlighting)
- To add a post: add entry to JSON + create the markdown file

### Backend API (port 5000)
- `POST /api/posts/:slug/views` — track post view by IP (deduped)
- `GET /api/comments` — paginated comments (`?currentPage=0&itemsPerPage=10`)
- `POST /api/comments` — create comment (password stored as bcrypt hash)
- `DELETE /api/comments/:id` — delete comment (requires password match)
- `GET /api/initDB` — initialize DB tables

### Database
PostgreSQL with two tables:
- `comments` — id, name, password (bcrypt), comment, created_at
- `post_views` — id, slug, ip_address, created_at (unique on slug+ip)

### Frontend Routing (Next.js App Router)
- `/` — home with profile + recommended/latest posts
- `/posts` — all posts list
- `/posts/[id]` — individual post with markdown renderer + view counter
- `/comment` — comment form + paginated list
- `/about` — about page

### Client–Server Communication
The client calls the Express API directly via Axios. In Docker, the server is on the `willki-shared` external network.

## Environment Variables
Server expects these (set in docker-compose.yml or `.env`):
- `DATABASE_URL` — PostgreSQL connection string
- `NODE_ENV`
- `ADMIN_PASSWORD` — for admin-level comment deletion
