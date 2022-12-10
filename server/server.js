import express from "express";
import cors from "cors";

// dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

// routes
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";

import Database from "./db/database.js"

const port = process.env.FAMIFY_SERVER_PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
app.use(cors(corsOptions));

// session
import MongoStore from "connect-mongo"
import session from "express-session"

app.use(session({
  secret: process.env.COOKIE_SECRET || 'secret_here',
  resave: true,
  saveUninitialized: false,
  maxAge: process.env.SESSION_MAXAGE,
  cookie : {
    secure: false, // 'true' uses HTTPS
    SameSite: 'none'
  },
  store: MongoStore.create(
    {mongoUrl: process.env.ATLAS_URI}
  )
}));

// routes
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", taskRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
