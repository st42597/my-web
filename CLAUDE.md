# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WillKi.dev is a personal blog/portfolio site with a Next.js 15 frontend, Spring Boot (Kotlin) backend, and PostgreSQL database, containerized with Docker Compose.

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

### Server (Spring Boot / Kotlin)
```bash
cd server-kotlin
./gradlew bootRun   # Run on port 5000 (requires Java 21)
./gradlew bootJar   # Build fat JAR
./gradlew test      # Run tests
```

### Database Initialization
```bash
curl http://localhost:5000/api/initDB   # Creates tables if not exists
```

## Architecture

### Monorepo Structure
- `client/` — Next.js 15 / React 19 frontend
- `server-kotlin/` — Spring Boot 3 / Kotlin backend (replaces `server/`)
- `server/` — Legacy Express.js backend (superseded)
- `postgreSQL/init.sql` — DB schema initialization
- `data/` — PostgreSQL persistent volume (Docker)

### Content System
Posts are **file-based** (no CMS):
- Metadata: `client/public/contents/postList.json` and `recommendedPostList.json`
- Content: `client/public/contents/[post-slug]/content.md` (Markdown with GFM, KaTeX math, syntax highlighting)
- To add a post: add entry to JSON + create the markdown file

### Backend API (port 5000)
- `POST /posts/{slug}/views` — track post view by IP (deduped)
- `GET /comments?currentPage=0&itemsPerPage=10` — paginated comments
- `POST /comments` — create comment (password stored as BCrypt hash)
- `DELETE /comments/{id}` — delete comment (requires password match; body: `{"password":"..."}`)
- `GET /initDB` — initialize DB tables

### server-kotlin Layer Architecture
```
controller/   — HTTP request/response handling
facade/       — Orchestration between controllers and services
service/      — Business logic
repository/   — JPA data access (Spring Data)
entity/       — JPA entities (Comment, PostView)
dto/          — Request/response data classes
config/       — SecurityConfig (BCrypt, CSRF disabled), CorsConfig
```

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
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` — PostgreSQL connection
- `ADMIN_PASSWORD` — for admin-level comment deletion (bypasses bcrypt check)
