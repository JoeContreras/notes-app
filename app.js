const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

yargs.version("1.1.0");
//create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    description: {
      describe: "Provide a description",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.description);
  },
});
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.remoteNote(argv.title);
  },
});
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
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
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
