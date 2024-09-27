const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");

let newItems = [];
app.get("/", function (req, res) {
  const options = {weekday: "long", month: "long", year: "numeric"}
  const today = new Date();
  const date = today.toLocaleDateString("en-US",options);
  res.render("index", {currentDate: date, newItems: newItems});
})

app.post("/", function (req, res) {
  let newItem = req.body.newItem
  newItems.push(newItem);
  res.redirect("/")
})

app.delete("/delete/:index", function(req, res) {
  const index = req.params.index;
  newItems.splice(index,1);
  res.sendStatus(200)
})

app.put("/update/:index", function (req, res) {
  const index = req.params.index;
  const newTodo = req.body.newItem;
  if(newItems[index]){
    newItems[index] = newTodo;
    res.sendStatus(200)
  }
  else{
    res.status(404).send("todo not found")
  }
})

app.listen(port, () => {
  console.log("app is listening on port", port)
})