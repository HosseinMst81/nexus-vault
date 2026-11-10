# 🎮 Nexus Vault — Next-Gen Digital Game Library Ecosystem

[![NestJS](https://img.shields.io/badge/Backend-NestJS_10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_17-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Orchestrated-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **Nexus Vault** is an enterprise-grade, full-stack digital video game library and management ecosystem. Engineered with **SOLID principles**, **Clean Architecture**, and an obsessive attention to modern visual hierarchy, spacing, and micro-interactions.

---

## 🌟 Key Highlights & Capabilities

- **Cinematic Spotlight Marquee**: Dynamic hero carousel showcasing marquee titles, trailers, Metacritic scores, and instantaneous gameplay sessions.
- **Enterprise Cataloging & Management**: Real-time filtering across play status (`INSTALLED`, `PLAYING`, `BACKLOG`, `COMPLETED`, `WISHLIST`), genres, platforms, and deep ILIKE keyword search.
- **Playtime Telemetry & Session Logger**: Accurate tracking of gaming hours, last-played timestamps, and live rolling averages.
- **Achievement Progression Tracker**: Track unlocked trophies, point values, and global rarity percentages with visual mastery bars.
- **Dual-Spec Hardware Validator**: Side-by-side Minimum vs. Recommended system requirements comparison (OS, CPU, GPU, RAM, Storage).
- **Curated Collections & Custom Playlists**: Group titles into thematic vaults with custom cyber gradients.
- **Community Evaluations & Reviews**: 5-star ratings, pros/cons pill tags, helpfulness voting, and dynamic game score calculation.
- **Executive Analytics Dashboard**: Granular metrics covering total library value ($), storage footprint (GB), completion percentage, and playtime-by-genre telemetry.
- **AI-Generated Concept Visuals**: High-resolution concept artworks generated specifically for original library titles (`Chronos: Cyber Legacy`, `Eldritch Eclipse`, `Astral Odyssey`).

---

## 🏗️ Architecture & Engineering Principles

```
                              ┌─────────────────────────────────────────┐
                              │            Next.js Frontend             │
                              │        (App Router + Tailwind)          │
                              └────────────────────┬────────────────────┘
                                                   │
                                                   │ Next.js Proxy Rewrite
                                                   │ /api/v1/*
                                                   ▼
                              ┌─────────────────────────────────────────┐
                              │           Nest.js Backend API           │
                              │     (TypeORM + Swagger + Validation)    │
                              └────────────────────┬────────────────────┘
                                                   │
                                                   │ Connection Pool
                                                   ▼
                              ┌─────────────────────────────────────────┐
                              │           PostgreSQL Database           │
                              │     (Relational Schema + Indices)       │
                              └─────────────────────────────────────────┘
```

### Applied Senior Engineering Patterns:
1. **SOLID Principles**:
   - **Single Responsibility (SRP)**: Distinct modules for `Games`, `Collections`, `Reviews`, `Stats`, and `Seed`.
   - **Open/Closed (OCP)**: Extensible query builders supporting dynamic filtering, pagination, and sorting strategies.
   - **Dependency Inversion (DIP)**: Controllers depend on service abstractions; services depend on injected TypeORM repositories.
2. **Standardized API Envelope**: Universal response transformation via `TransformInterceptor` (`{ success: true, statusCode: 200, data: ..., meta: ... }`).
3. **Resilient Error Handling**: Centralized `AllExceptionsFilter` providing deterministic JSON payloads for all HTTP and database exceptions.
4. **Declarative Validation**: Global `ValidationPipe` with `class-validator` and `class-transformer` enforcing strict DTO types.
5. **Multi-Stage Dockerization**: Minimal Alpine production containers with security hardening (non-root `nestuser` and `nextjs` users).
6. **Zero-CORS Client Architecture**: Frontend uses relative path queries (`/api/v1/...`) proxied through Next.js server rewrites, avoiding direct localhost browser exposure.

---

## 📂 Repository Structure

```
nexus-vault/
├── apps/
│   ├── api/                          # Nest.js Backend Application
│   │   ├── Dockerfile                # Multi-stage production Dockerfile
│   │   ├── src/
│   │   │   ├── common/               # Filters, interceptors, pagination DTOs
│   │   │   ├── modules/
│   │   │   │   ├── games/            # Games catalog, search, status, playtime
│   │   │   │   ├── collections/      # Curated vaults & playlist management
│   │   │   │   ├── reviews/          # Player feedback & ratings
│   │   │   │   ├── stats/            # Telemetry & library analytics
│   │   │   │   ├── health/           # Liveness probes
│   │   │   │   └── seed/             # Automated bootstrap & seed data
│   │   │   ├── app.module.ts
│   │   │   └── main.ts               # Swagger, CORS, validation configuration
│   │   └── tsconfig.json
│   │
│   └── web/                          # Next.js Frontend Application
│       ├── Dockerfile                # Multi-stage production Dockerfile
│       ├── public/art/               # High-res concept art assets
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx          # Discover / Storefront / Showcase
│       │   │   ├── library/          # Complete interactive library manager
│       │   │   ├── collections/      # Thematic playlists viewer
│       │   │   └── stats/            # Analytics & telemetry dashboard
│       │   ├── components/           # Modular atomic UI components
│       │   │   ├── Navbar.tsx
│       │   │   ├── HeroBanner.tsx
│       │   │   ├── GameCard.tsx
│       │   │   ├── FilterBar.tsx
│       │   │   ├── GameDetailModal.tsx
│       │   │   ├── AddGameModal.tsx
│       │   │   ├── PlaytimeLoggerModal.tsx
│       │   │   ├── ReviewComposerModal.tsx
│       │   │   └── StatsDashboard.tsx
│       │   └── lib/                  # API client & TypeScript interfaces
│       └── tailwind.config.ts        # Cyberpunk dark gaming palette
│
├── docker-compose.yml                # Production orchestration
├── docker-compose.dev.yml            # Development hot-reloading compose
├── .env.example                      # Configuration template
├── package.json                      # Monorepo workspaces & scripts
└── README.md
```

---

## 🚀 Quick Start Guide

### Option 1: Docker Compose (Recommended)

Run the full stack (PostgreSQL + NestJS API + NextJS Web) with a single command:

```bash
# 1. Clone repository
git clone https://github.com/nexus-vault/nexus-vault.git
cd nexus-vault

# 2. Start services
docker-compose up --build
```

- **Frontend Client**: `http://localhost:3000`
- **Backend API**: `http://localhost:4000/api/v1`
- **Swagger Documentation**: `http://localhost:4000/api/docs`

---

### Option 2: Local Development Setup

#### Prerequisites
- Node.js >= 20.x
- PostgreSQL 16/17 running locally

#### 1. Setup PostgreSQL Database
```sql
CREATE USER nexus WITH PASSWORD 'nexuspass' SUPERUSER;
CREATE DATABASE nexus_vault OWNER nexus;
```

#### 2. Install Dependencies
```bash
# In api workspace
cd apps/api
npm install
npm run build

# In web workspace
cd ../web
npm install
npm run build
```

#### 3. Run Servers
```bash
# Terminal 1 - Nest.js Backend API
cd apps/api
npm run start:dev

# Terminal 2 - Next.js Frontend Client
cd apps/web
npm run dev
```

---

## 📡 RESTful API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/games` | Search, filter (status, genre, platform), and paginate games |
| `GET` | `/api/v1/games/featured` | Retrieve top spotlight marquee games |
| `GET` | `/api/v1/games/:id` | Get detailed game intel with achievements & reviews |
| `POST` | `/api/v1/games` | Add new game title to vault |
| `PUT` | `/api/v1/games/:id` | Update game metadata |
| `DELETE` | `/api/v1/games/:id` | Remove title from library |
| `PATCH` | `/api/v1/games/:id/status` | Update play status (`PLAYING`, `COMPLETED`, etc.) |
| `PATCH` | `/api/v1/games/:id/favorite` | Toggle favorite flag |
| `POST` | `/api/v1/games/:id/playtime` | Log session minutes to telemetry |
| `GET` | `/api/v1/collections` | List all curated collections |
| `POST` | `/api/v1/collections` | Create custom playlist |
| `POST` | `/api/v1/reviews` | Submit player evaluation & recalculate score |
| `PATCH` | `/api/v1/reviews/:id/helpful` | Upvote review helpfulness |
| `GET` | `/api/v1/stats` | Aggregated library analytics |
| `GET` | `/api/v1/health` | Liveness health probe |

Interactive Swagger Explorer is available at `/api/docs`.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
