# Dopamine Driven Dashboard (DDD)

## 📌 Overview
The Dopamine Driven Dashboard (DDD) is a performance and engagement analytics system designed to provide insights into user activity, progress, and achievements.

This project integrates data across different modules and presents it through a centralized dashboard for monitoring and analysis.

---

## 🎯 Implemented Feature
### Teacher Dashboard for Student Performance Monitoring (Spandan)

This feature allows teachers to track and analyze student performance during and after sessions.

---

## 🚀 Features

### ✅ Student Performance
- Questions attempted
- Correct and incorrect answers
- Total points earned
- Average response time

### ✅ Question Analytics
- Number of responses
- Correct answer percentage
- Average answer time

### ✅ Session Overview
- Total students
- Total questions
- Total points

### ✅ API Integration
- Backend APIs connected with frontend
- Real-time data simulation using activity API

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **API Testing:** Thunder Client  

---

## 📡 API Endpoints

- `POST /activity` → Store activity data  
- `GET /student-performance` → Get student performance  
- `GET /questions/:id` → Get question analytics  
- `GET /session/:id` → Get session overview  

---

## ▶️ How to Run

### Backend
```bash
cd backend
npm install
node server.js
