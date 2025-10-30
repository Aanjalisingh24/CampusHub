# CampusHub – Student Campus Management System

**CampusHub** is a full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application that simplifies campus operations for **students**, **teachers**, and **administrators**.
It provides secure authentication, role-based dashboards, and efficient course management — all within a modern, responsive interface.

---

## Live Demo
Visit the live website here: [CampusHub](https://campushub-client.onrender.com)

## Features

### Student Dashboard

* View **personalized and available courses**
* Update **profile picture**

###  Teacher Dashboard

* Manage and update **assigned courses**
* **Upload assignments** & **mark attendance**
* Post **announcements** for students
* View and manage **enrolled students** *(UI only)*

###  Admin Dashboard

* **Add, edit, and delete** students, teachers, and courses
* Manage **user roles** and platform data
* Full **system control** from a single dashboard

---

## Tech Stack

| Layer              | Technology                            |
| ------------------ | ------------------------------------- |
| **Frontend**       | React.js, Tailwind CSS, Framer Motion |
| **Backend**        | Node.js, Express.js                   |
| **Database**       | MongoDB (via Mongoose)                |
| **Authentication** | JSON Web Token (JWT)                  |
| **Deployment**     | Render (Backend) + Vercel (Frontend)  |

---

##  Installation & Setup (Developer Mode)

### Clone the repositories

```bash
git clone https://github.com/<your-username>/campushub-client.git
git clone https://github.com/<your-username>/campushub-server.git
```

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

### 3️⃣ Setup the Frontend

```bash
cd ../campus-client
npm install
```

Run the frontend:

```bash
npm run dev
```

---

##  Deployment Details

* **Backend:** [Render](https://render.com)
* **Frontend:** [Vercel](https://vercel.com)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

---

##  UI Highlights

* Sleek **gradient-based design** with Tailwind CSS
* Smooth **animations** using Framer Motion
* Fully **responsive** and mobile-friendly
* Clean, intuitive role-based dashboards

---

##  Authentication Flow

1. User registers as **Student**, **Teacher**, or **Admin**
2. A **JWT token** is generated and stored in localStorage
3. Dashboard is rendered based on **user role**
4. **Logout** clears all stored user data securely

---

##  Future Enhancements

* Real-time notifications for announcements
* Complete attendance tracking backend logic
* Assignment upload and submission system
* Email alerts for students & teachers
* Admin analytics dashboard with reports

---

##  Author

**Aanjali Kumari**
*Full Stack Web Developer*
📍 *India*

---

> *CampusHub bridges communication between students, teachers, and admins — making campus management smarter and simpler.*

