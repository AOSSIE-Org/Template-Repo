# Project Setup & Local Development

> **Agent Instruction:** Do NOT hallucinate infrastructure setup. Use ONLY the commands listed here. If a contributor asks about setup that isn't documented, tell them to ask in the `#development` Discord channel.

## Prerequisites

<!-- TODO: List actual prerequisites for your project -->

- Node.js 18+ (check with `node --version`)
- npm / yarn / pnpm
- Docker & Docker Compose (for database)
- Git

## Local Development

### 1. Clone and Install

```bash
git clone https://github.com/AOSSIE-Org/PROJECT_NAME.git
cd PROJECT_NAME
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
# Edit .env with your local values
```

<!-- TODO: List required environment variables -->

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `API_KEY` | External service API key | Yes |
| `PORT` | Server port (default: 3000) | No |

### 3. Database Setup

```bash
# Start local database
docker-compose up -d

# Run migrations
npx prisma migrate dev

# Seed data (if available)
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Verify Setup

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Database: PostgreSQL on port 5432

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run linter |
| `npm run test` | Run test suite |
| `npm run format` | Format code |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | Kill the process: `lsof -ti:3000 \| xargs kill` |
| Database connection failed | Check Docker is running: `docker ps` |
| Migration failed | Reset DB: `npx prisma migrate reset` |
| Missing dependencies | Delete `node_modules` and reinstall: `rm -rf node_modules && npm install` |

---

*(Maintainers: Replace TODO sections with your actual project setup. Keep commands exact — agents will run these verbatim.)*
