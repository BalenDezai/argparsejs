class Arg {
  constructor(flag, action, dest, nargs, constValue) {
    const flags = flag.split(', ');
    this.flag = flags[0];
    this.alias = flags[1];
    this.action = action;
    this.nargs = nargs;
    this.constValue = constValue;
    this.tempResult = null;
    this.handled = false;
    // this.nargs = nargs;
    // this.constValue = constValue;
    // this.defaultValue = defaultValue;
    // this.type = type;
    // this.choices = choices;
    // this.required = required;
    // this.help = help;
    // this.metavar = metavar;
    this.dest = dest;
  }
}

module.exports = Arg;
