import express from "express";
const app = express();
export default app;

import usersRouter from "./api/users.js";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
import cors from "cors";
import morgan from "morgan";
import activitiesRouter from "#api/activities";
import favoritesRouter from "#api/favorites";
import categoriesRouter from "#api/categories";

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.use("/api/activities", activitiesRouter);
app.use("/favorites", favoritesRouter);
app.use("/categories", categoriesRouter);

app.get("/", (req, res) => res.send("Hello, World!"));

app.use("/api/users", usersRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
