# Command line parser

A simple helper to parse command line stuff.

Useful for scripts and such.

Usage:

```js
const { buildCLI, exit, error, consume, int } = require('./command-parser')

const defaults = { depth: 0}

const parse = buildCLI(defaults)`
Any text you'd like here.

Flags

  -h --help     this screen ${ ()=> exit(parse.help)}
  -d --depth    determines how deep into directories recursion goes${(args) => int(args.shift())}
  -f --files    one or more files or directories to process${ args => consume(args).filter(Boolean) }

Usage:

  node %script% -d 10 -i <file>
`

const options = parse(process.argv.slice(2))

if(!files || !files.length){
  error(`you should provide at least one file to operate on\n\n${parse.help}`)
}

// do whatever you want now
```

The main method here is `buildCLI`.

BuildCli takes one (optional) argument, which are the defaults, and a back-ticked string, and returns a function that can parse a command line series of flags.

It does this by detecting functions in the string, and reading the line before it.
It will use any `-x` and `--xxx` as short and long versions of the argument. Everything else doesn't matter, feel free to use any text you'd like.

The string `%script%` will be replaced by the script name

On top of the `buildCLI` command, there are a few helper functions:

- `exit` displays a message and exits
- `error` displays a message to stderr and exits with a return value of `1`
- `int` converts a string to integer with base 10
- `consume` consumes all subsequent tokens until the next `-`; useful for flags that have multiple tokens. `consume` takes an optional second argument which limits the amount of tokens (default to `1000`)

## Parse

This function is returned by the `buildCLI` function. Once given a string of flags, it will return an object.

the keys are the long names of each flag. The values are whatever was returned from your functions.
This object is mixed with the `defaults` you provide.

A special key, `_rest`, contains an array of all the unprocessed tokens.