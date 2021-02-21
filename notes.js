const fs = require("fs");
const _ = require("lodash");
const chalk = require("chalk");
const addNote = (title, description) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({ title: title, description: description });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added."));
  } else {
    console.log(chalk.inverse.red("This title already exists!"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => note.title === title);
  if (foundNote) {
    console.log(chalk.green.bold(foundNote.title));
    console.log(foundNote.description);
  } else {
    console.log(chalk.red("Note was not found"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (newNotes.length !== notes.length) {
    saveNotes(newNotes);
    console.log(chalk.green("Note was removed"));
  } else {
    console.log(chalk.red("note does not exist!"));
  }
};

const listNotes = () => {
  console.log(chalk.green.inverse("Your notes: "));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.green(note.title));
  });
};

const saveNotes = (notes) => {
  const JsonString = JSON.stringify(notes);
  fs.writeFileSync("notes.json", JsonString);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
module.exports = {
  addNote: addNote,
  remoteNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
