const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const Port = 4000;
// require("./app/postlist")(app, {});
app.listen(Port, () => {
  console.log(`server run : http//localhost:${Port}/`);
});

app.use("/api/postlist", require("./routes/postlistRouter"));
app.use("/api/commnedlist", require("./routes/postlistRouter"));
