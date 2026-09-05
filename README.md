# ⚡ Flowmetrics - Engineering Productivity & Workload Analytics Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://flowmetrics-psi.vercel.app)
[![API Status](https://img.shields.io/badge/Backend_API-Render-46E3B7?style=for-the-badge&logo=render)](https://flowmetrics-psi.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Live Website:** 🌐 **[https://flowmetrics-psi.vercel.app](https://flowmetrics-psi.vercel.app)**  
> **Author**: Vivek Jain ([@vivek-jain-dev](https://github.com/vivek-jain-dev))

Flowmetrics is an enterprise-grade full-stack web application designed to help engineering leaders track deep work, eliminate cognitive friction, forecast sprint velocity, and balance team workload without intrusive surveillance.

---

## 🌟 Key Features

### 🚀 Public Experience
- **Modern Landing Page**: Glassmorphism UI with gradient aesthetics, interactive ROI calculator, and dynamic metrics preview.
- **Interactive Dashboard Preview**: Simulated real-time focus scores, pull request turnaround latencies, and cognitive load distributions.
- **Full-featured Blog Engine**: Markdown-rendered articles with tags, reading times, search/filter, and SEO metadata.
- **Dynamic Pricing Table**: Real-time pricing tiers fetched dynamically from the database with custom feature highlights and annual/monthly billing toggles.

### 🛡️ Admin Control Center
- **Secure Authentication**: JWT token authentication with role-based access control.
- **Dashboard Analytics**: Real-time aggregated stats (active plans, total articles, published vs draft counts).
- **Pricing Plan Manager**: Add, edit, reorder, delete, and highlight pricing tiers directly from the UI.
- **Blog Publisher & Markdown Editor**: Rich markdown editor with live split-screen preview, tag manager, and draft/published state toggles.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, React-Markdown |
| **Backend** | Node.js, Express, TypeScript, Mongoose (MongoDB ODM), Zod Validation, Helmet, CORS |
| **Security** | JWT (JSON Web Tokens), Bcrypt.js password hashing, Express Rate Limiting |
| **Styling** | Vanilla Tailwind CSS design system with customized dark slate & emerald palette |

---

## 📁 Repository Structure

```text
FLOWMETRICS/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment and database connection
│   │   ├── controllers/     # Auth, Plan, Blog, and Admin controllers
│   │   ├── middleware/      # Auth guard, error handler, rate limiters
│   │   ├── models/          # Mongoose schemas (User, PricingPlan, BlogPost)
│   │   ├── routes/          # RESTful route definitions
│   │   ├── schemas/         # Zod request validation schemas
│   │   ├── scripts/         # Database seed script
│   │   └── server.ts        # Express server entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── (public)/        # Landing page & public blog routes
│   │   ├── admin/           # Protected admin dashboard, blog, and plans
│   │   ├── globals.css      # Custom animations & Tailwind base
│   │   └── layout.tsx       # Root layout & font configurations
│   ├── components/
│   │   ├── admin/           # Admin header, sidebar, modal, markdown editor
│   │   ├── landing/         # Hero, Features, Pricing, Testimonials, Footer
│   │   └── ui/              # Reusable Button, Card, Badge, Input, Skeleton
│   ├── lib/
│   │   ├── api/             # Typed API client services
│   │   └── context/         # AuthContext provider
│   ├── types/               # Shared TypeScript models
│   ├── .env.example
│   ├── package.json
│   └── tailwind.config.ts
│
└── README.md
```

---

## 🚀 Quick Start Guide (One Single Command)

### Step 1: Install All Dependencies
From the root directory (`d:\FLOWMETRICS`):
```bash
npm run install:all
```

### Step 2: Seed Database (Optional / Initial Setup)
```bash
npm run seed
```

### Step 3: Run the Entire Website in One Command!
```bash
npm run dev
```
> This starts **both the backend API (port 5000)** and **frontend web app (port 3000)** concurrently in one terminal window with color-coded logs!

Open your browser and visit: **[http://localhost:3000](http://localhost:3000)**

---

---

## 🔐 Default Admin Credentials

Upon running `npm run seed` in the backend:
- **Admin Portal URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@flowmetrics.io`
- **Password**: `AdminPassword123!`

---

## 📡 API Endpoints Overview

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/v1/health` | No | System health check |
| `POST` | `/api/v1/auth/login` | No | Authenticate admin user |
| `GET` | `/api/v1/auth/me` | Yes (Bearer) | Get current authenticated profile |
| `GET` | `/api/v1/plans` | No | Get all active pricing plans |
| `POST` | `/api/v1/plans` | Yes (Admin) | Create a new pricing plan |
| `PUT` | `/api/v1/plans/:id` | Yes (Admin) | Update an existing pricing plan |
| `DELETE` | `/api/v1/plans/:id` | Yes (Admin) | Delete a pricing plan |
| `GET` | `/api/v1/blog` | No | Get published blog posts (supports pagination & tags) |
| `GET` | `/api/v1/blog/:slug` | No | Get single published article by slug |
| `GET` | `/api/v1/blog/admin/all` | Yes (Admin) | Get all articles (including drafts) |
| `POST` | `/api/v1/blog` | Yes (Admin) | Create a new blog post |
| `PUT` | `/api/v1/blog/:id` | Yes (Admin) | Update an article |
| `DELETE` | `/api/v1/blog/:id` | Yes (Admin) | Delete an article |
| `GET` | `/api/v1/admin/stats` | Yes (Admin) | Aggregate dashboard statistics |

---

## 🧪 Production Builds

### Backend
```bash
cd backend
npm run build
npm run start
```

### Frontend
```bash
cd frontend
npm run build
npm run start
```

---

## 👨‍💻 Author

**Vivek Jain**

- GitHub: [vivek-jain-dev](https://github.com/vivek-jain-dev)
- LinkedIn: [Vivek Jain](https://www.linkedin.com/in/vivek-jain-9bb35128b)

