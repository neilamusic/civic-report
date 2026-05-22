 CivicReport — Fix Your City Problems

**CivicReport** is a full-stack community platform where residents can report local infrastructure issues — potholes, broken streetlights, graffiti, flooding, and more. Reports can be tracked from "Open" through "In Progress" to "Resolved," giving communities visibility into what's being fixed.

 **Live App:** [https://frontend-fnoy59i1w-neila-s-projects1.vercel.app]

---

## Features

**Browse all reports** filtered by status (Open / In Progress / Resolved)
 **File new reports** with category, location, and description
 **Update report status** as issues get addressed
 **Delete resolved or duplicate reports**
 **Fully responsive** — works on mobile and desktop

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React, Axios, CSS                 |
| Backend    | Node.js, Express.js               |
| Database   | Supabase (PostgreSQL)             |
| Deployment | Vercel (frontend), Render (backend) |

---

## Getting Started (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A free [Supabase](https://supabase.com) account

### 1. Clone the repo

```bash
git clone https://github.com/neilamusic/civic-report.git
cd civic-report
```

### 2. Set up the database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open the **SQL Editor** in your project dashboard
3. Paste and run the contents of `supabase_setup.sql`
4. Go to **Project Settings → API** and copy your **Project URL** and **anon public** key

### 3. Configure the backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your Supabase credentials:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=4000
```

Install dependencies and start:

```bash
npm install
npm run dev
```

Backend will run at `http://localhost:4000`

### 4. Configure the frontend

```bash
cd ../frontend
cp .env.example .env
```

Leave `REACT_APP_API_URL` empty for local development (the proxy handles it).

Install dependencies and start:

```bash
npm install
npm start
```

Frontend will open at `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| GET    | `/api/health`                 | Health check             |
| GET    | `/api/reports`                | Get all reports          |
| GET    | `/api/reports/:id`            | Get single report        |
| POST   | `/api/reports`                | Create a new report      |
| PATCH  | `/api/reports/:id/status`     | Update report status     |
| DELETE | `/api/reports/:id`            | Delete a report          |

---

## Deployment

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your repo, set root directory to `backend`
4. Add environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
5. Start command: `npm start`
6. Copy your Render URL (e.g. `https://civic-report-api.onrender.com`)

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Connect your repo, set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL=https://your-render-url.onrender.com`
4. Deploy!

---

## Project Reflection

This project taught me how all the layers of a web application connect together end-to-end. Setting up Supabase as a database-as-a-service was much faster than configuring a traditional database, and using Express.js helped me understand how HTTP routing and middleware works. The biggest challenge was handling async data fetching in React and making sure errors from the backend were surfaced clearly to the user.

---

## Team

- ** Neila Music** — Full Stack Development

---

