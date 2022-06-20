const yargs = require("yargs");
const { listNotes, addNote, removeNote, readNote } = require("./notes.js");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler({ title, body }) {
    addNote(title, body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove the note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler({ title }) {
    removeNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler({ title }) {
    readNote(title);
  },
});

yargs.parse();
