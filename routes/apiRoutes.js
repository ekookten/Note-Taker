const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the router
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    console.log(data);
    res.json(data)
});
});

// GET Route for a specific note
router.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    // .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

// DELETE Route for a specific note
router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    // .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all router except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI note
router.post("/notes", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json(`Please try again.`);
  }

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = router;
