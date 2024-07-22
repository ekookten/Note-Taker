const router = require("express").Router();
const path = require('path');

// GET Route for homepage
router.get('/', (req, res) => {
console.log("test1",path.join(__dirname, '/public/index.html'));
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "..", 'public', 'notes.html'));
});



module.exports = router;