// // server.js
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const API_URL = 'https://jsonplaceholder.typicode.com/users';

// // Fetch all users
// app.get('/users', async (req, res) => {
//   try {
//     const response = await axios.get(API_URL);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users' });
//   }
// });

// // Add a new user
// app.post('/users', async (req, res) => {
//   const { firstName, lastName, email, department } = req.body;
//   if (!firstName || !lastName || !email || !department) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newUser = { name: `${firstName} ${lastName}`, email, company: { name: department } };
//     const response = await axios.post(API_URL, newUser);
//     res.status(201).json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding user' });
//   }
// });

// // Edit an existing user
// app.put('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const { firstName, lastName, email, department } = req.body;

//   if (!firstName || !lastName || !email || !department) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const updatedUser = { name: `${firstName} ${lastName}`, email, company: { name: department } };
//     const response = await axios.put(`${API_URL}/${id}`, updatedUser);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating user' });
//   }
// });

// // Delete a user
// app.delete('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import users from './user.js';


const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());


let users = [
  { id: 1, name: "John Doe", email: "john@example.com", company: { name: "Acme Inc" } },
  { id: 2, name: "Jane Smith", email: "jane@example.com", company: { name: "Globex Corp" } },
];


app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Add a new user
app.post("/users", (req, res) => {
  const { id, name, email, company } = req.body;
  if (!name || !email || !company) {
    return res.status(400).json({ error: "Name, email, and company are required" });
  }
  const newUser = { id, name, email, company };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email, company } = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], name, email, company };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
