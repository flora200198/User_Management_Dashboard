
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import users from './user.js';


const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());




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
