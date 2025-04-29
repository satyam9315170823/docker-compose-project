import express from "express";
import { PrismaClient } from "../src/generated/prisma"; // adjust path if needed

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Register a new user
//@ts-ignore
app.post("/register", async (req, res) => {
 

 

  try {
    const user = await prisma.user.create({
      data: {
        username:Math.random().toString(),
        password:Math.random().toString()
         
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user." });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
