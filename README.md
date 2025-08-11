# SkillMarket

[![React](https://img.shields.io/badge/Frontend-React-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TanStack Router](https://img.shields.io/badge/Routing-TanStack%20Router-ff4d4f)](https://tanstack.com/router)
[![TanStack Query](https://img.shields.io/badge/Data-TanStack%20Query-ff4d4f)](https://tanstack.com/query)
[![Express](https://img.shields.io/badge/Backend-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://skill-market-pi.vercel.app/)

[**Live Demo Site →**](https://skill-market-pi.vercel.app/)

**SkillMarket** is a skill exchange platform designed to connect individuals who want to learn, teach, or trade expertise in various fields. The platform enables users to create detailed profiles, showcase their skills, list services, and browse offerings from others in the community. With secure authentication and intuitive search and filtering, SkillMarket ensures a seamless experience for finding the right skill partner—whether for professional growth, hobby exploration, or collaborative projects.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Backend](#backend)  
- [Frontend](#frontend)  
- [Validation & Security](#validation--security)  
- [Future Improvements](#future-improvements)  
- [Credits & Learning Outcome](#credits--learning-outcome)

---

## Features

- User Authentication via **JWT** (JSON Web Tokens) and secure password hashing using **bcrypt**.
- RESTful API backend built with **Express**, connecting to **MongoDB**.
- Client-side Routing with **TanStack Router**.
- Data Fetching & State Management using **TanStack Query** and **zustand**.
- Interactive **TanStack Forms** with client-side validation and error handling.
- Elegant UI built with **tailwindcss** and **shadcn/ui** components—stylish and consistent.
- Seamless UI animations with **Framer Motion**.
- Data Validation on both backend and frontend with **Zod**.

---

## Tech Stack

| Layer      | Tools & Libraries                                                                       |
| ---------- | ----------------------------------------------------------------------------------------|
| Backend    | Express.js, MongoDB, JWT, bcrypt, Zod                                                   |
| Frontend   | React, TanStack Router, TanStack Query, TanStack Forms, shadcn/ui, Zod, zustand, Motion |
| Deployment | Vercel (frontend), Render(server)                                                       |

---

## Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB instance (local or hosted)
- Environment variables set via `.env`

### Clone & Setup

```bash
git clone https://github.com/vraun0/SkillMarket.git
cd SkillMarket
```

#### Backend

```bash
cd server
npm install
# Create .env file with:
# - MONGODB_URI
# - JWT_SECRET
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

Once both servers are running, the frontend communicates with the backend seamlessly.

---

## Backend

- **Express API** handles authentication endpoints (signup/login) using JWTs and password hashing with bcrypt.
- **MongoDB** powers user and marketplace data.
- **Zod** ensures request validation for clean, reliable inputs.

---

## Frontend

- Built in React, leveraging **TanStack Router** for multi-page flow (e.g. login, skill listings, forms).
- **TanStack Query** handles async data fetching and caching.
- **TanStack Forms** simplifies form state and validation.
- **shadcn/ui** provides polished, accessible UI components.
- **Motion** creates intriguing UI animations that capture the user.
- **zustand** maintains global app state (e.g. user session).
- **Zod** validates inputs before submitting them to the backend.

---

## Validation & Security

- **Password Security**: bcrypt is used to hash and salt user passwords.
- **Authentication**: JWTs validate all protected routes.
- **Input Safety**: Zod schema enforcement on both frontend and backend prevents malformed data.

---

## Future Improvements

- Implement payments or booking flows.
- Implement user profile and settings.
- Add search and filters on skills.
- Include user profiles and skill endorsements.
- Implement mobile compatible ui styling.

---

## Credits & Learning Outcome

SkillMarket was an incredible learning journey. I gained hands-on experience with:

- Secure authentication and data handling
- Zod-based validation on both ends
- State & form management with TanStack tools and zustand
- Building a clean, functional UI with shadcn/ui

**Try the Demo live:** [https://skill-market-pi.vercel.app/](https://skill-market-pi.vercel.app/)
