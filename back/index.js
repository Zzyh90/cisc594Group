const express = require("express");
const app = express();
const dotenv = require("dotenv");
const gameRoute = require("./routes/game");

const cors = require('cors')

dotenv.config();


app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(cors())

app.use("/api/game", gameRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});