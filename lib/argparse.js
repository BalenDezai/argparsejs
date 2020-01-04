const Arg = require('./arg');
const Namespace = require('./namespace');
const actions = require('./actions');
const ArgparseError = require('./error.js');

// TODO: refactor
class Argparser {
  constructor() {
    this.namedArgs = [];
  }

  addArgument({
    flags, action = 'store', dest, nargs, constValue,
  }) {
    if (flags.includes('-')) {
      // switch (action) {

      // }
      this.namedArgs.push(new Arg(flags, action, dest, nargs, constValue));
    } else {
      throw new ArgparseError('Can not parse argument without identifer');
    }
  }

  parseArgs(cliArgs) {
    let nameSpace = new Namespace();
    cliArgs = cliArgs.slice(2, cliArgs.length);
    this.trimArgs(cliArgs);
    nameSpace = this.handleNamedArgs(cliArgs, this.namedArgs, nameSpace);
    return nameSpace;
  }

  trimArgs(args) {
    if (!args[0 - 1] && !args[0].startsWith('-')) {
      // show error message
    }
  }

  handleNamedArgs(args, argNames, nameSpace) {
    // for each user inputted argument
    for (let i = 0; i < argNames.length; i += 1) {
      const index = args.findIndex((arg) => arg === argNames[i].flag || arg === argNames[i].alias);
      if (index > -1) {
        const val = this.handleAction(argNames[i], args, index) || argNames[i].constValue;
        nameSpace[argNames[i].dest] = val;
        args = this.deleteArgs(args, index, argNames[i].nargs);
      } else {
        nameSpace[argNames[i].dest] = null;
      }
    }
    return nameSpace;
  }

  handleAction(foundArg, args, foundAtIndex) {
    switch (foundArg.action) {
      case actions.STORE: return this.handleNarg(foundArg.nargs, args, foundAtIndex);
      case actions.STORE_CONST: return foundArg.constValue;
      case actions.STORE_TRUE: return true;
      case actions.STORE_FALSE: return false;
      case actions.APPEND: return this.handleNarg(foundArg.nargs, args, foundAtIndex);
      default: throw new Error('Error  Handling action');
    }
  }

  handleNarg(nargs, args, foundAtIndex) {
    if (typeof nargs === 'number') {
      const tempArr = [];
      let h;
      for (h = 0; h < nargs; h += 1) {
        tempArr.push(args[foundAtIndex + h]);
      }
      return tempArr;
    }
    switch (nargs) {
      case undefined: {
        return args[foundAtIndex + 1];
      }
      case '?': {
        if (!args[foundAtIndex + 1].startsWith('-')) {
          return args[foundAtIndex + 1];
        }
        return null;
      }
      case '*': {
        let position = 1;
        const tempArr = [];
        while (!args[foundAtIndex + position].startsWith('-')) {
          tempArr.push(args[foundAtIndex + position]);
          position += 1;
        }
        return tempArr;
      }
      case '+': {
        let position = 1;
        const tempArr = [];
        while (!args[foundAtIndex + position].startsWith('-')) {
          tempArr.push(args[foundAtIndex + position]);
          position += 1;
        }
        if (tempArr.length === 0) throw new Error();
        return tempArr;
      }
      default: throw new Error('Error handling nargs');
    }
  }

  deleteArgs(args, startIndex, nargs) {
    if (typeof nargs === 'number') {
      args.splice(startIndex, nargs);
      return args;
    }
    switch (nargs) {
      case undefined: args.splice(startIndex, 1); return args;
      case '?': args.splice(startIndex, 1); return args;
      case '*': {
        let position = 1;
        while (!args[startIndex + position].startsWith('-')) position += 1;
        args.splice(startIndex, position);
        return args;
      }
      case '+': {
        let position = 1;
        while (!args[startIndex + position].startsWith('-')) position += 1;
        args.splice(startIndex, position);
        return args;
      }
      default: throw new Error();
    }
  }
}

module.exports = Argparser;
