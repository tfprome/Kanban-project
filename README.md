#Kanban Board Project

A full-stack Kanban application built with the MERN stack (MongoDB, Express, React, Node.js) featuring JWT-based authentication, protected routes, and a drag-and-drop Kanban interface.

---

##Project setup instructions

1. Clone the repository

```bash
git clone https://github.com/tfprome/kanban-project.git
cd kanban-app

2. Backend Setup
cd server
nodemon index.js

3. Frontend Setup
cd ../Kanban
npm run dev

##Rest API documentation

Post '/register'
Register a user
{
  "email": "lito@gmail.com",
  "password": "123579"
}

Post '/login'
Login user and receive JWT.
{
  "email": "lito@gmail.com",
  "password": "123579"
}

Note for Reviewers:
=> user password is hashed using bcryptjs
=> the login form, register form and the kanban board is designed using inline CSS
=> the user data is saved in local database due to some technical issues
=> the drag and drop is performed using react-beautiful-dnd
