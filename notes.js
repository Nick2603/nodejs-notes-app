const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (duplicateNote) {
    console.log(
      chalk.red.inverse(`Note with title: '${title}' already exists!`)
    );
  } else {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse(`New note with title: '${title}' added!`));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    const parsedData = JSON.parse(dataJSON);
    return parsedData;
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  if (filteredNotes.length === notes.length) {
    console.log(chalk.red.inverse(`No note with title: "${title}"!`));
  } else {
    saveNotes(filteredNotes);
    console.log(chalk.green.inverse(`Note with title: "${title}" is removed!`));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length !== 0) {
    console.log(chalk.green.inverse("Your notes' titles:"));
    notes.forEach((note) => console.log(note.title));
  } else {
    console.log(chalk.red.inverse("No notes"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const searchedNote = notes.find((note) => note.title === title);
  if (searchedNote) {
    console.log(chalk.green.inverse("Here is your note: "));
    console.log(`Title: '${searchedNote.title}' Body: '${searchedNote.body}'`);
  } else {
    console.log(chalk.red.inverse(`No note with title: '${title}' is found!`));
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
