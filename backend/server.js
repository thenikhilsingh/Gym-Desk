const express = require("express");
const dotenv = require("dotenv");
const { authRouter } = require("./routers/authRouter");
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`the server is listening on http://localhost:${PORT}`);
});
