// Dependencies
const express = require("express");
const path = require("path");
const notes = require("./db/db.json");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Grabs HTML files in public folder
app.use(express.static("public"));
// Sets up the Express app to handle data parsing (middle ware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// Create new note input into API
app.post("/api/notes", function (req, res) {
  console.log(req.body);
  let note = req.body;
  note.id = note.title.replace(/\s+/g, "").toLowerCase();
  notes.push(note);
  console.log(notes);
});

// Displays all current notes from API
app.get("/api/notes", function (req, res) {
  return res.json(notes);
});

// Deletes selected note from API
app.delete("/api/notes/:note", function (req, res) {
  let deletedNote = req.params.note;
  for (let i = 0; i < notes.length; i++) {
    if (deletedNote === notes[i].id) {
      res.json(notes.splice(i, 1));
    }
  }
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});







// =============================================================

