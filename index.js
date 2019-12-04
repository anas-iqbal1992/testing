const express = require("express"); //return function
const app = express(); // return object of type express

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
