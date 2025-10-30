# 🎓 CampusHub – Student Campus Management System

**CampusHub** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to streamline campus operations for students, teachers, and administrators. It provides role-based dashboards, user authentication, and course management — all in one modern, responsive platform.

---
## Features

### Student Dashboard

* View **personalized courses** and **available courses**
*  Can Update profile 

### Teacher Dashboard

* Manage assigned courses
* **Upload assignments** and **mark attendance**
* **Post announcements** for students
* View and manage enrolled students *(UI only)*

### 🧑‍💼 Admin Dashboard

* **Add, edit, or delete** students, teachers, and courses
* Manage user roles and platform data
* Centralized control over the system

---

## 🛠 Tech Stack

| Layer          | Technology                                   |
| -------------- | -------------------------------------------- |
| Frontend       | React.js (with Tailwind CSS & Framer Motion) |
| Backend        | Node.js + Express.js                         |
| Database       | MongoDB (Mongoose ORM)                       |
| Authentication | JWT (JSON Web Token)                         |
| Deployment     | Render (Backend) + Vercel (Frontend)         |

---

##  Project Structure

campushub/
├── campus-client/        # React Frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Login, Register, Dashboard, Home, profile, ProtectedRoute pages
│   │   └── api/          # Axios setup for API requests
│   └── package.json
│
└── campus-server/        # Node + Express Backend
    ├── models/           # Mongoose schemas
    ├── routes/           # API routes
    ├── controllers/      # Logic handling
    ├── middleware/       # JWT auth, validation
    └── server.js
```

## Installation & Setup

### Clone the Repositories

```bash
git clone https://github.com/<your-username>/campushub-client.git
git clone https://github.com/<your-username>/campushub-server.git

### Setup the Backend

```bash
cd campus-server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

### Setup the Frontend

```bash
cd ../campus-client
npm install
```

Create a `.env` file:

```
VITE_API_URL=https://campushub-server.onrender.com
```

Start the frontend:

```bash
npm run dev
```

---

##  Deployment

* **Backend:** [Render](https://render.com)
* **Frontend:** [Vercel](https://vercel.com)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🎨 UI Highlights

* Modern **gradient design** with Tailwind CSS
* **Motion animations** using Framer Motion
* **Responsive layout** for all devices
* Clean and user-friendly dashboards

---

## Authentication Flow

1. User registers as **Student / Teacher / Admin**
2. JWT token is generated and stored in local storage
3. Role-based dashboards are rendered after login
4. Logout clears all stored user data

---

## 💡 Future Improvements

*  Real-time notifications for announcements
*  Attendance tracking backend logic
*  Assignment upload & submission system
*  Email alerts for students and teachers
*  Admin analytics dashboard

---

##  Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request with improvements.

---

## License

This project is open-source and available under the **MIT License**.

---

## Author

**Aanjali Kumari**
BCA Student | Web Developer | MERN Stack Enthusiast
📧 [Your Email]
🌐 [Your Portfolio or GitHub Profile]
