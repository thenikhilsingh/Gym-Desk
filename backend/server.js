const express = require("express");
const dotenv = require("dotenv");
const { authRouter } = require("./routers/authRouter");
dotenv.config();
const cors = require("cors");
const plansRouter = require("./routers/plansRouter");
const membersRouter = require("./routers/membersRouter");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/plans", plansRouter);
app.use("/api/members", membersRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`the server is listening on http://localhost:${PORT}`);
});
