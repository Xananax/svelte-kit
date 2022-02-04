import { sep } from 'path'

export const exit = (...things: string[]) => {
  console.log(...things)
  process.exit(0)
}

/**
 * @param {any[]} things
 */
export const error = (...things) => {
  console.error(...things)
  process.exit(1)
}

/**
 * @param {string} n
 * @return {number}
 */
export const int = (n) => {
  return parseInt(n, 10)
}

/**
 * @param {string[]} args
 * @returns {string[]}
 */
export const consume = (args, max = 1000) => {
  const buffer = []
  while (args[0] && args[0][0] !== '-' && max > 0) {
    buffer.push(args.shift())
    max--
  }
  return buffer
}

export const buildCLI =
  <T>(defaults: T) =>
  (stringArray: TemplateStringsArray, ...args: any) => {
    const scriptName = process.argv[1].split(sep).pop()
    const strings = stringArray.map((s) => s.replace(/%script%/g, scriptName))

    const buffer = []
    const commands = {}

    args.forEach((arg, index) => {
      buffer.push(strings[index])
      if (typeof arg === 'function') {
        const [short, long] = strings[index]
          .split('\n')
          .pop()
          .trim()
          .replace(/-+/g, '')
          .toLowerCase()
          .split(/\s+/)
        const pair = [long, arg]
        commands[`${short}`] = pair
        commands[`${long}`] = pair
      } else {
        buffer.push(arg)
      }
    })
    buffer.push(strings[strings.length - 1])

    const help = buffer.join('')

    const processCommand = (flags) => {
      flags = flags.slice()
      const _rest = []
      const opts = { ...defaults, _rest }

      while (flags.length) {
        const current = flags.shift()

        if (current[0] === '-') {
          const name = current.replace(/-+/g, '').toLowerCase()
          const commandPair = commands[name]
          if (commandPair) {
            const [key, command] = commandPair
            opts[key] = command(flags, opts)
            continue
          }
        }

        _rest.push(current)
      }
      return opts
    }

    processCommand.help = help
    return processCommand
  }
