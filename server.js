// Dependencies
const express = require("express");
const path = require("path");

// Sets up the Express App
const PORT = process.env.PORT || 3001;
const app = express();

const todos = [
  {
    text: "walk the dog",
    done: false,
  },
  {
    text: "wash the car",
    done: true,
  }
];

app.use(express.static("public"));
// Sets up the Express app to handle data parsing (middle ware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/api/todos", function (req, res) {
  return res.json(todos);
});

// Create New ToDo input
app.post("/api/todos", function (req, res) {
  console.log(req.body);
  todos.push(req.body);
  res.send(200);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});






// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function (req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all characters
app.get("/api/characters", function (req, res) {
  return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function (req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
