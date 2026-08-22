import { Router } from "express";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import db from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { serializeUser } from "../utils/serialize.js";

const router = Router();

function isValidEmail(email) {
  return typeof email === "string" && /\S+@\S+\.\S+/.test(email);
}

router.post("/register", (req, res) => {
  const { name, email, password } = req.body || {};

  if (!isValidEmail(email) || !password || password.length < 6) {
    return res.status(400).json({
      error: "Valid email and a password of at least 6 characters are required",
    });
  }

  const existing = db.find("users", (u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: "An account with that email already exists" });
  }

  const user = {
    id: `user-${nanoid(10)}`,
    name: name || email.split("@")[0],
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    createdAt: new Date().toISOString(),
  };
  db.insert("users", user);

  const token = signToken(user);
  return res.status(201).json({ token, user: serializeUser(user) });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!isValidEmail(email) || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = db.find("users", (u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = signToken(user);
  return res.json({ token, user: serializeUser(user) });
});

router.get("/me", requireAuth, (req, res) => {
  const user = db.find("users", (u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ user: serializeUser(user) });
});

export default router;
