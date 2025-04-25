# FeedbackHub

**FeedbackHub** is a modern feedback collection platform where users can register, submit feedback, and manage their input. Admins have access to an overview dashboard to monitor and respond to feedback trends.

## 🚀 Features

- 🔐 User Authentication (Register/Login)
- 📝 Submit and View Feedback
- 📊 Admin Dashboard
- 🧭 Protected Routing
- 🧠 State Management with Zustand
- 📦 Backend API with Express & MongoDB
- ✨ Styled with Tailwind CSS and Shadcn UI

---

## 🧰 Tech Stack

### Frontend:
- React
- TypeScript
- Tailwind CSS
- Zustand (for global auth store)
- React Router
- Ant Design & Shadcn UI

### Backend:
- Express
- TypeScript
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Dotenv for environment config

---

## 📦 Installation

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/feedbackhub.git
cd feedbackhub


feedbackhub/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.tsx
│   │   └── main.tsx
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── index.ts
│
└── README.md


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


### SETUP Frontend:

cd frontend
npm install
npm run dev


### setUp backend

cd backend
npm install
npm run dev
