# Celebal Technologies Node.js Assignments

This repository contains multiple Node.js assignments, each demonstrating different concepts and features of Node.js, Express, MongoDB, and modern JavaScript. Below is a summary of each assignment, setup instructions, and usage details.

---

## Table of Contents
- [Assignment 1: Hello World](#assignment-1-hello-world)
- [Assignment 2: File Management Tool](#assignment-2-file-management-tool)
- [Assignment 3: MongoDB CRUD Application](#assignment-3-mongodb-crud-application)
- [Assignment 4: Express.js Server with Middleware & Routing](#assignment-4-expressjs-server-with-middleware--routing)

---

## Assignment 1: Hello World

A simple Node.js script that prints `Hello, World!` to the console.

**How to run:**
```bash
node Assignment1/Assignment\ 1.js
```

---

## Assignment 2: File Management Tool

A comprehensive file management tool built with Node.js. It supports file creation, reading, updating, deletion, and listing via:
- **Web interface** (browser)
- **REST API**
- **Command-line interface (CLI)**

**Features:**
- Create, read, update, and delete files in the `managed_files` directory
- List files with metadata
- Web interface for browser-based management
- Command-line interface for terminal usage
- RESTful API endpoints
- Error handling and validation

**Dependencies:**
- Node.js built-in modules: `fs`, `path`, `http`, `url`

**How to run:**
- **Demo mode:**
  ```bash
  node Assignment\ 2/Assigment\ 2.js --demo
  ```
- **Web server:**
  ```bash
  node Assignment\ 2/Assigment\ 2.js --server
  # Optionally specify port: --port 8080
  ```
  Then open [http://localhost:3000](http://localhost:3000) in your browser.
- **CLI mode:**
  ```bash
  node Assignment\ 2/Assigment\ 2.js --cli
  ```

---

## Assignment 3: MongoDB CRUD Application

A RESTful API for managing student records using Node.js, Express, and MongoDB (via Mongoose). Demonstrates CRUD operations and includes sample data population.

**Features:**
- Create, read, update, and delete student records
- MongoDB integration with Mongoose
- RESTful API endpoints
- Sample data population on first run

**Dependencies:**
- `express`
- `mongoose`

**How to run:**
1. Ensure MongoDB is running locally on `mongodb://localhost:27017/student_management`.
2. Install dependencies:
   ```bash
   cd Assignment\ 3
   npm install express mongoose
   ```
3. Start the server:
   ```bash
   node app.js
   ```
4. API Endpoints:
   - `POST /students` - Create new student
   - `GET /students` - Get all students
   - `GET /students/:id` - Get student by ID
   - `PUT /students/:id` - Update student
   - `DELETE /students/:id` - Delete student

---

## Assignment 4: Express.js Server with Middleware & Routing

A custom Express.js server demonstrating advanced routing, middleware, and static file serving.

**Features:**
- Multiple endpoints (users API, about, health check, etc.)
- Custom middleware for logging and headers
- Static file serving (if `public` directory exists)
- Error handling and 404 responses

**Dependencies:**
- `express`

**How to run:**
```bash
cd Assignment\ 4
npm install express
node Assignment\ 4.js
```

The server will be available at [http://localhost:3000](http://localhost:3000).

---

## Notes
- Some assignments may require additional setup (e.g., MongoDB for Assignment 3).
- For zipped assignments, extract them to view their contents.
- All code is for educational and demonstration purposes.

---

