const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/mongoose.config");

const app = express();
const port = 8000;


const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const projectRoutes = require("./routes/routes");
app.use("/api", projectRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


app.listen(port, () => console.log(`Listening on port: ${port}`));
