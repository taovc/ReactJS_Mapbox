const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
const data = require("./routes/data")

// connecter db
mongoose
  .connect(
    "mongodb+srv://tao:Qaz123456@tao.erlvepw.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log("Connexion à MongoDB échouée !", e));

// permettra à toutes les demandes de toutes les origines d'accéder à notre API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors());
app.use(express.json());

app.use("/api", data);

module.exports = app;
