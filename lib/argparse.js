class Argparser {
  constructor(
    prog = process.argv[1], usage = '',
    description = '', epilog = '',
    formatterClass, prefixChars = '-',
    fromFilePrefixChars = '', argumentDefault = null,
    conflictHandler = null, addHelp = true, allowAbbrev = true,
  ) {
    this.prog = prog;
    this.usage = usage;
    this.description = description;
    this.epilog = epilog;
    this.formatterClass = formatterClass;
    this.prefixChars = prefixChars;
    this.fromFilePrefixChars = fromFilePrefixChars;
    this.argumentDefault = argumentDefault;
    this.conflictHandler = conflictHandler;
    this.addHelp = addHelp;
    this.allowAbbrev = allowAbbrev;
  }

  addArgument(flag, action, nargs,  constValue, defaultValue, type, choices, required, help, metavar, dest) {
    
  }

  parseArgs() {

  }
}

module.exports = Argparser;
