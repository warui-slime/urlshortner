# URL Shortener with Analytics Dashboard

A full-stack application for creating shortened URLs and tracking their performance, built with **Next.js**, **Express**, **MongoDB**, and **Tailwind CSS**.

---

## 🚀 Features

### 🔗 URL Shortening
- Create custom short links  
- Set expiration dates for links  
- Generate QR codes for each link

### 📊 Analytics Dashboard
- Track clicks, locations, and devices  
- Visualize data with interactive charts (Recharts)  
- View detailed link performance metrics

### 🔐 User Authentication
- Secure JWT-based login system  
- Protected API routes  
- Session/token management

---

## 🛠️ Tech Stack

### **Frontend**
- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### **Backend**
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)

### **Monorepo Tooling**
- [Turborepo](https://turbo.build/repo)

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB instance
- `pnpm` or `yarn` installed

---

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/warui-slime/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Setup**  
   Create `.env.local` files in both `apps/frontend` and `apps/backend` directories:

   **Frontend: `apps/frontend/.env.local`**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   **Backend: `apps/backend/.env`**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3001
   ```

---

## 🧪 Running the Application

Run both frontend and backend together using Turborepo:

```bash
turbo build && turbo dev
```

Open the app in your browser:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🗂 Project Structure (Turborepo)
```
url-shortener/
├── apps/
│   ├── frontend/        # Next.js frontend
│   └── backend/         # Express backend
├── packages/            # Shared types/utils (if needed)
├── public/              # Static assets
├── turbo.json           # Turborepo config
├── package.json         # Root dependencies & scripts
└── README.md            # You're here
```

---
