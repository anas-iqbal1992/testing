const express = require("express"); //return function
const app = express(); // return object of type express

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});
const PORT = process.evn.PORT || 5000;
app.listen(5000, () => console.log(`listing at port no 5000`));
