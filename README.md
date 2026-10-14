
# Webx - Modern Job Portal Platform

**Webx** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) job portal application designed to bridge the gap between job seekers and employers. It features secure authentication, role-based access control (RBAC), and a responsive user interface for seamless job searching and management.

---

## 🚀 Tech Stack

### Frontend
* **React.js** (with Vite)
* **Tailwind CSS** for styling
* **React Router** for navigation
* **Axios** for API requests

### Backend
* **Node.js** & **Express.js** REST API
* **MongoDB & Mongoose** for database management and ODM
* **JSON Web Tokens (JWT)** for secure authentication
* **Bcrypt.js** for password hashing
* **Dotenv** for environment variable management

---

## 📁 Project Structure

```text
Webx/
├── backend/                  # Node.js & Express server
│   ├── controllers/          # Business logic for routes
│   ├── middlewares/          # Custom auth & error-handling middlewares
│   ├── models/               # Mongoose schemas (Users, Jobs, Applications)
│   ├── routes/               # API endpoint definitions
│   ├── utils/                # Utility helpers
│   ├── index.js              # Server entry point
│   ├── package.json          # Backend dependencies
│   └── package-lock.json
│
├── frontend/                 # React client application
│   ├── src/                  # Components, pages, and assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
│
└── README.md                 # Project documentation

```

---

## ✨ Key Features

* **Secure Authentication & Authorization:** User registration and login utilizing JWT tokens and password hashing.
* **Role-Based Access Control (RBAC):** Distinct permissions and dashboards for Job Seekers (applying for jobs, tracking status) and Employers (posting jobs, managing applicants).
* **Job Management:** Search, filter, and view detailed job listings.
* **Responsive Design:** Fully mobile-friendly layout built with Tailwind CSS.

---

## ⚙️ Getting Started Locally

To run this project on your local machine, follow these steps:

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your system.

### 1. Clone the Repository

```bash
git clone [https://github.com/Neeraj814/Webx.git](https://github.com/Neeraj814/Webx.git)
cd Webx

```

### 2. Setup & Run the Backend

Navigate to the backend folder, install dependencies, and start the server:

```bash
cd backend
npm install

```

Create a `.env` file inside the `backend/` folder and add your environment variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here

```

Start the backend development server:

```bash
npm run dev

```

*(The server will run on `http://localhost:8000`)*

### 3. Setup & Run the Frontend

Open a new terminal window, navigate to the frontend folder, install dependencies, and start the client:

```bash
cd frontend
npm install
npm run dev

```

*(The frontend will typically run on `http://localhost:5173`)*

---

## ☁️ Deployment

* **Backend:** Deployed on **Render** (Node.js web service environment).
* **Database:** Hosted on **MongoDB Atlas** (Cloud database cluster).

---

## 👤 Author

* **Neeraj Kumar Bhoi**
* GitHub: [@Neeraj814](https://www.google.com/search?q=https://github.com/Neeraj814)

```

```
