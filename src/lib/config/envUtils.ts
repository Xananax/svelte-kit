const makeError = (text: string) => {
  const error = `ENV ERROR:
  "${text}" is not set in the .env file. 
  Make sure you have an .env file at the root of the project with that value set.
  This variable is read in ${import.meta.url}.
  It should be set in '.env.development.local' or '.env.production.local' depending on your environment
`
  return error
}

export const hasMissingFields = (props: Record<string, any>) =>
  Object.keys(props)
    .filter((key) => typeof props[key] == 'undefined' || !props[key])
    .map((key) => {
      const err = makeError('VITE_' + key.toUpperCase())
      console.error(err)
    }).length > 0

export const checkAndDie = (props: Record<string, any>) =>
  hasMissingFields(props) && process.exit(1)
