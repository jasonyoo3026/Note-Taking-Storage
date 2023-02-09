const dbFile = require('../db/db.json');
const fs = require('fs');
let nextId = dbFile.length + 1;

module.exports = function (app) {
  app.post('/api/notes', function (req, res) {
    console.log(req.body);

    const newNote = {
      ...req.body,
      id: nextId++
    };
    console.log(newNote);

    dbFile.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(dbFile), function (err) {
      if (err) throw err;

      res.json(dbFile);
    });
  });

  app.get('/api/notes', function (req, res) {
    res.json(dbFile);
  });

  app.delete('/api/notes/:id', function (req, res) {
    const idToRemove = parseInt(req.params.id);

    const updatedDb = dbFile.filter(note => note.id !== idToRemove);

    console.log(updatedDb);

    fs.writeFile('./db/db.json', JSON.stringify(updatedDb), function (err) {
      if (err) throw err;
      res.json(updatedDb);
    });
  });
};
