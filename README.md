# 📋 Task Management System – Frontend

A modern and responsive **frontend application** for the Task Management System built using **React.js**.

This application provides an intuitive user interface that allows users to **register, log in, and manage their tasks efficiently**.  
It communicates with the backend REST API built using **Spring Boot**.

The goal of this project is to demonstrate **real-world full-stack application development**, where a React frontend consumes secure REST APIs from a backend service.

---

# 🚀 Features

## 🔐 Authentication
- User Registration
- User Login
- Protected routes

## 📌 Task Management
- Create new tasks
- View all tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed
- Display task details such as title, description, and due date

## 🎨 User Interface
- Responsive design
- Clean and modern layout
- Form validation
- Inline error handling
- Dynamic task updates without page reload

Task management web apps typically help users organize activities, track progress, and improve productivity through simple UI interactions like adding, editing, or removing tasks. :contentReference[oaicite:1]{index=1}

---

# 🏗️ Project Structure

```
src
 ├── components        # Reusable UI components
 ├── pages             # Application pages
 ├── services          # API service calls
 ├── utils             # Helper functions
 ├── assets            # Images and static assets
 ├── styles            # CSS files
 ├── App.js            # Main React component
 └── index.js          # Entry point
```

---

# ⚙️ Architecture Overview

```
React Frontend
      │
      │ HTTP Requests (Fetch / Axios)
      ▼
Spring Boot Backend API
      │
      ▼
MySQL Database
```

The frontend communicates with the backend using **REST API calls**.

Example:

```
POST /api/auth/login
GET  /api/tasks
POST /api/tasks
PUT  /api/tasks/{id}
DELETE /api/tasks/{id}
```

---

# 🛠️ Tech Stack

## Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3

## Libraries & Tools
- Fetch API
- React Router
- Local Storage
- Git & GitHub
- VS Code

---

# 🔑 Authentication Flow

```
1. User enters email and password
2. Frontend sends login request to backend
3. Backend validates credentials
```

---

# 📡 API Integration

The frontend communicates with the backend server.

Example configuration:

```
const API_BASE_URL = "http://localhost:8080/api";
```

Example API request:

```javascript
axios.get("/api/tasks", {
  headers: {
    Authorization:
  }
});
```

---

# ▶️ Running the Project

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Rahul-web-2/Task-Management-SystemFE.git
```

---

## 2️⃣ Navigate to Project

```bash
cd Task-Management-SystemFE
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Start Development Server

```bash
npm start
```

The application will run on:

```
http://localhost:3000
```

---

# 🔗 Backend Repository

This frontend works with the backend API:

Backend Repo:  
https://github.com/Rahul-web-2/Task-Management-SystemBE

---

# 🧪 Example User Flow

### 1️⃣ Register Account
User creates an account using the registration form.

### 2️⃣ Login
User logs in.

### 3️⃣ Dashboard
User can:
- View all tasks
- Create new tasks
- Update existing tasks
- Delete tasks

---

# 🔒 Security Considerations


---

# 📈 Future Improvements

- JWT authentication
- Protected API requests
- Secure token storage
- JWT token storage
- Secure API communication
- Input validation
- Error handling
- Backend returns JWT token
- Token stored in localStorage
-Token added to Authorization header
- Secure APIs can now be accessed
- Drag & drop task management
- Task categories and labels
- Pagination and search
- Dark mode UI
- Notifications
- Mobile responsive improvements
- Refresh token authentication
- Integration with WebSockets for real-time updates

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```
git checkout -b feature/new-feature
```

3. Commit changes

```
git commit -m "Add new feature"
```

4. Push to GitHub

```
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Rahul**

Full Stack Developer  
Java | Spring Boot | React | REST APIs

GitHub:  
https://github.com/Rahul-web-2
