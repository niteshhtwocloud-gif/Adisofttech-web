# 🚀 AdiSofTech (AST) — Enterprise Full-Stack Monorepo

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js%2020-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare%20Turnstile-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

**Smart Solutions for a Better Tomorrow**  
Enterprise-grade Web Applications, Custom Software, Mobile Platforms, ERP Solutions, and Business Automation.

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Monorepo Architecture](#-monorepo-architecture)
- [Key Features](#-key-features)
  - [1. Public Website](#1-public-website-port-3000)
  - [2. Admin CMS Portal](#2-admin-cms-portal-port-3001)
  - [3. Backend REST API](#3-backend-rest-api-port-5000)
- [Security & Architecture Principles](#-security--architecture-principles)
- [Quick Start Guide](#-quick-start-guide)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Environment Variables](#2-environment-variables-setup)
  - [3. Installation](#3-install-dependencies)
  - [4. Running Development Servers](#4-running-the-applications)
- [Complete REST API Documentation](#-complete-rest-api-documentation)
- [Folder Structure Details](#-folder-structure-details)
- [Production Deployment](#-production-deployment)
- [License](#-license)

---

## 🌟 Overview

**AdiSofTech (AST)** is a scalable, modular monorepo engineered to power both the public-facing corporate website and a dedicated, role-based executive Admin CMS portal backed by a high-concurrency Node.js Express REST API and MongoDB Atlas.

```
┌──────────────────────────────────────────────────────────┐
│                   AdiSofTech Monorepo                    │
├────────────────────────────┬─────────────────────────────┤
│  Public Website (:3000)    │   Admin CMS Portal (:3001)  │
│  - Next.js 15 App Router   │   - Executive Dashboard     │
│  - Cloudflare Turnstile    │   - Lead Management (CRM)   │
│  - Responsive Showcase     │   - Blog & Service CMS      │
└─────────────┬──────────────┴──────────────┬──────────────┘
              │                             │
              ▼                             ▼
┌──────────────────────────────────────────────────────────┐
│           Express REST API Server (:5000)                │
│  - JWT Bearer Auth (bcrypt hashing)                      │
│  - Cloudflare Turnstile Server Verification              │
│  - Nodemailer SMTP Lead Alerts                           │
│  - Rate Limiting, Helmet, CORS                           │
└─────────────────────────────┬────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────┐
│                 MongoDB Atlas Cluster                    │
│  - Collections: Users, Contacts, Blogs, Services, Projs  │
└──────────────────────────────────────────────────────────┘
```

---

## 🏛️ Monorepo Architecture

```text
adisofttech/
├── client/
│   ├── website/                  # Public Next.js Website (Port 3000)
│   │   ├── src/
│   │   │   ├── app/              # Next.js App Router (/about, /projects, /blog, etc.)
│   │   │   ├── components/       # Hero, Services, BusinessOS, Contact, etc.
│   │   │   ├── lib/              # Static fallbacks, SEO helpers, utilities
│   │   │   └── services/         # Client API connector
│   │   ├── public/               # Logos, hero assets, portfolio images
│   │   ├── .env.local            # Website environment configuration
│   │   └── package.json
│   │
│   ├── admin/                    # Dedicated Admin CMS Portal (Port 3001)
│   │   ├── src/
│   │   │   ├── app/              # Dashboard, Blog CMS, Contacts, Services, Users
│   │   │   ├── components/       # Custom Modals, Sidebar, Navbar, Portals
│   │   │   └── services/         # Admin API connector with JWT management
│   │   ├── public/               # Admin brand assets
│   │   ├── .env.local            # Admin environment configuration
│   │   └── package.json
│   │
│   ├── dev.js                    # Concurrent dev runner for both frontends
│   └── package.json
│
├── server/                       # Node.js + Express REST API (Port 5000)
│   ├── src/
│   │   ├── config/               # Database, CORS, Environment configs
│   │   ├── controllers/          # Request & response controllers
│   │   ├── middleware/           # JWT Authentication, Role check, Error handlers
│   │   ├── models/               # Mongoose schemas (User, Contact, Blog, Service, Project)
│   │   ├── routes/               # Modular API routes
│   │   ├── services/             # Business logic & 3rd party integrations (Turnstile, Email)
│   │   ├── utils/                # JWT sign/verify, password hashing
│   │   └── server.js             # Server initialization & middleware pipeline
│   ├── scripts/
│   │   └── seed.js               # Database seeder for starter content
│   ├── .env                      # Server private environment configuration
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ✨ Key Features

### 1. Public Website (Port `3000`)
- **Modern UI/UX**: Crafted with modern typography, glassmorphic cards, gradient accents, and responsive layout.
- **Interactive Business OS Showcase**: Live interactive ERP dashboard demo and workflow preview.
- **Dynamic Case Studies**: Deep-dive portfolio pages (`/portfolio/[id]` & `/projects`) with search and category filtering.
- **Editorial Blog Engine**: Live blog listing and article pages (`/blog` & `/blog/[slug]`).
- **Bot-Proof Consultation Form**: Protected with **Cloudflare Turnstile** manual checkbox verification (`appearance: "always"`).
- **SEO & Performance**: 100/100 Lighthouse-ready with structured metadata, OpenGraph tags, dynamic `sitemap.ts`, and `robots.ts`.

### 2. Admin CMS Portal (Port `3001`)
- **Executive Overview Dashboard**: Real-time counter metrics for leads, articles, published posts, and system status.
- **Client Inquiries & CRM**: Instant search filtering, status management, email inspection, and single-click inquiry purge.
- **Content Management System (CMS)**:
  - **Blog Publications**: Create, edit, publish/draft toggle, slug generator, and delete.
  - **Service Offerings**: Reorder, toggle active states, edit features, and real-time website synchronization.
  - **Portfolio Case Studies**: Manage featured client projects, metrics, tags, and thumbnails.
- **Modern UI Modals**: Sleek, accessible `ConfirmModal` dialogs replacing native browser alerts for delete actions and sign out.
- **Secure JWT Session Management**: Auto-refreshing session handling with secure cookie/storage storage.

### 3. Backend REST API (Port `5000`)
- **Modular Architecture**: Clean separation of routes, controllers, services, and Mongoose models.
- **Turnstile Verification**: Server-to-server Cloudflare Turnstile token validation against `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
- **Automated Email Notifications**: Asynchronous Nodemailer SMTP alerts whenever prospective clients submit consultation requests.
- **Security Middleware**: Configured with `helmet`, strict `cors` origins, and `express-rate-limit` protection.

---

## 🔒 Security & Architecture Principles

1. **Strict Zero-Direct DB Access**: Frontends never communicate with MongoDB directly. All queries pass through authenticated REST endpoints.
2. **Cryptographic Protection**: User passwords are saved with `bcrypt` salt rounds (10). Plaintext passwords are never logged or returned.
3. **Stateless JWT Tokens**: Role-scoped Bearer token validation with configurable expiration (`7d`).
4. **Cloudflare Turnstile**: Enforces manual interactive CAPTCHA on the client and validates cryptographically with `TURNSTILE_SECRET_KEY` on the backend.
5. **Environment Isolation**: Production secrets and database URIs are isolated to `server/.env`.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: `v18.x` or `v20.x` LTS
- **npm**: `v9.x` or higher
- **MongoDB Atlas**: Connection URI string

---

### 2. Environment Variables Setup

#### 🅰️ Backend (`server/.env`):
Create `server/.env` (or copy from `server/.env.example`):
```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/adisofttech?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=ast_jwt_super_secret_production_key_2026_adisofttech
JWT_EXPIRES_IN=7d

# Cross-Origin Allowed Origins
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# SMTP Email Configuration
EMAIL_USER=niteshgupta919843@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=niteshgupta919843@gmail.com

# Cloudflare Turnstile Secret Key (Backend)
TURNSTILE_SECRET_KEY=0x4AAAAAAE_3BsAFzlfo_BM38Dn1rQ6uh9w

# Default Admin Credentials
ADMIN_EMAIL=nitesh.htwocloud@gmail.com
ADMIN_PASSWORD=Nitesh@321
```

#### 🅱️ Public Website (`client/website/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAE_3BuWxEMFxi3Qj
SITE_URL=https://www.adisofttech.com
```

#### 🅲 Admin CMS (`client/admin/.env.local`):
```env
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

### 3. Install Dependencies

Install all dependencies across each directory:

```bash
# 1. Install Backend Dependencies
cd server
npm install

# 2. Install Public Website Dependencies
cd ../client/website
npm install

# 3. Install Admin CMS Dependencies
cd ../admin
npm install

# 4. Install Client Root Runner Dependencies
cd ..
npm install
```

---

### 4. Running the Applications

#### ⚡ Quick Launch (Recommended):

Open **Terminal 1** (Backend API):
```bash
cd server
npm run dev
```

Open **Terminal 2** (Both Frontends Concurrently):
```bash
cd client
npm run dev
```

#### 🌐 Running Services Individually:

| Application | URL | Directory | Dev Command |
|---|---|---|---|
| **Express REST API** | [http://localhost:5000](http://localhost:5000) | `server/` | `npm run dev` |
| **Public Website** | [http://localhost:3000](http://localhost:3000) | `client/website/` | `npm run dev` |
| **Admin CMS Portal** | [http://localhost:3001](http://localhost:3001) | `client/admin/` | `npm run dev` |

---

## 📡 Complete REST API Documentation

Base Endpoint: `http://localhost:5000/api/v1`

### 🏥 1. System Health
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | Public | Checks database connection and server uptime |

---

### 🔑 2. Authentication (`/auth`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | Public | Authenticates admin and returns JWT Bearer token |
| `GET` | `/auth/me` | Bearer | Returns current administrator profile data |
| `POST` | `/auth/forgot-password` | Public | Dispatches OTP to registered admin email |
| `POST` | `/auth/reset-password` | Public | Validates OTP and updates administrator password |

---

### 📬 3. Client Inquiries & Leads (`/contacts`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/contacts` | Public (Turnstile) | Submits consultation request with CAPTCHA token |
| `GET` | `/contacts` | Admin | Fetches paginated leads with search filters |
| `PATCH` | `/contacts/:id` | Admin | Updates inquiry status (`new`, `contacted`, `resolved`) |
| `DELETE` | `/contacts/:id` | Admin | Permanently deletes inquiry from database |

---

### 📝 4. Blog Publications (`/blogs`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/blogs` | Public | Returns published blog posts (supports `search`, `category`) |
| `GET` | `/blogs/:slug` | Public | Fetches detailed blog article by slug |
| `POST` | `/blogs` | Admin | Creates a new editorial publication |
| `PATCH` | `/blogs/:slug` | Admin | Updates publication contents or toggle publish state |
| `DELETE` | `/blogs/:slug` | Admin | Deletes article from database |
| `POST` | `/blogs/seed` | Admin | Seeds starter articles into MongoDB Atlas |

---

### ⚙️ 5. Services & Solutions (`/services`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/services` | Public | Returns active service capabilities |
| `POST` | `/services` | Admin | Creates new service offering |
| `PATCH` | `/services/:id` | Admin | Updates service details, order, or active state |
| `DELETE` | `/services/:id` | Admin | Deletes service offering |

---

### 💼 6. Portfolio Case Studies (`/projects`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/projects` | Public | Returns portfolio case studies |
| `GET` | `/projects/:slug` | Public | Returns case study by slug |
| `POST` | `/projects` | Admin | Creates new portfolio item |
| `PATCH` | `/projects/:id` | Admin | Updates project details |
| `DELETE` | `/projects/:id` | Admin | Deletes portfolio item |
| `POST` | `/projects/seed` | Admin | Syncs starter portfolio case studies into MongoDB Atlas |

---

## 🛠️ Folder Structure Details

```text
client/
├── website/
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/page.tsx               # About Company page
│   │   │   ├── blog/page.tsx                # Blog Articles directory
│   │   │   ├── blog/[slug]/page.tsx         # Single Article View
│   │   │   ├── contact/page.tsx             # Consultation page
│   │   │   ├── portfolio/page.tsx           # Portfolio Showcase
│   │   │   ├── portfolio/[id]/page.tsx      # Deep-dive Case Study
│   │   │   ├── projects/page.tsx            # All Projects page
│   │   │   ├── privacy-policy/page.tsx      # Privacy Policy
│   │   │   ├── terms/page.tsx               # Terms & Conditions
│   │   │   ├── layout.tsx                   # Main Layout & Shell
│   │   │   ├── sitemap.ts                   # Dynamic XML Sitemap
│   │   │   └── robots.ts                    # Dynamic Robots.txt
│   │   ├── components/
│   │   │   ├── Navbar.tsx                   # Sticky Nav with Section Highlighting
│   │   │   ├── Hero.tsx                     # Brand Hero Banner
│   │   │   ├── About.tsx                    # Value Commitments & Stats
│   │   │   ├── Services.tsx                 # Core Capabilities Grid
│   │   │   ├── BusinessOS.tsx               # AST Business OS Feature Breakdown
│   │   │   ├── BusinessOSDashboard.tsx      # Interactive ERP Mockup
│   │   │   ├── Portfolio.tsx                # Featured Case Studies Carousel
│   │   │   ├── ProjectsListing.tsx          # Full Searchable Projects Engine
│   │   │   ├── Contact.tsx                  # Interactive Turnstile Consultation Form
│   │   │   ├── Footer.tsx                   # Corporate Footer
│   │   │   └── WhatsAppButton.tsx           # Floating Direct Inquiry Button
│   │   └── lib/
│   │       ├── blogData.ts                  # Static Seed Publications
│   │       └── portfolioData.ts             # Static Seed Case Studies
│
└── admin/
    ├── src/
    │   ├── app/
    │   │   ├── dashboard/page.tsx           # Executive Metrics Dashboard
    │   │   ├── blog/page.tsx                # Blog Management CMS
    │   │   ├── blog/new/page.tsx            # Article Editor (Create)
    │   │   ├── blog/edit/[slug]/page.tsx    # Article Editor (Update)
    │   │   ├── contacts/page.tsx            # Leads & CRM Management
    │   │   ├── services/page.tsx            # Service Offerings CMS
    │   │   ├── projects/page.tsx            # Case Study Portfolio CMS
    │   │   ├── users/page.tsx               # Administrator Accounts
    │   │   ├── profile/page.tsx             # Admin Profile & Credentials
    │   │   └── login/page.tsx               # Admin Portal Login & OTP Reset
    │   ├── components/
    │   │   ├── common/ConfirmModal.tsx      # Reusable Custom Modal Dialog
    │   │   ├── sidebar/AdminSidebar.tsx     # Admin Navigation Sidebar
    │   │   └── navbar/AdminNavbar.tsx       # Status Header & User Profile Pill
    │   └── services/
    │       └── api.ts                       # Axios Client with Bearer Token interceptor
```

---

## 🚢 Production Deployment

### 1. Build Verification
```bash
# Typecheck and build website
cd client/website
npm run build

# Typecheck and build admin CMS
cd ../admin
npm run build
```

### 2. Deployment Recommendations
- **Public Website (`client/website`)**: Deploy on [Vercel](https://vercel.com) or [Cloudflare Pages](https://pages.cloudflare.com) with root directory set to `client/website`.
- **Admin CMS (`client/admin`)**: Deploy on [Vercel](https://vercel.com) or a private subdomain (e.g. `admin.adisofttech.com`).
- **Express REST API (`server`)**: Deploy on [Render](https://render.com), [Railway](https://railway.app), [AWS EC2](https://aws.amazon.com), or Docker container with Node.js 20 environment.

---

## 📄 License

Proprietary Software — © 2026 **AdiSofTech (AST)**. All Rights Reserved.