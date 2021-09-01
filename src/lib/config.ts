export const title = 'GDQuest'
export const youtube = 'https://www.youtube.com/c/gdquest'
export const twitter = 'https://twitter.com/NathanGDQuest'
export const github = 'https://github.com/GDQuest/'
export const discord = 'https://discord.gg/87NNb3Z'

export const socialMedia = [
  ['Youtube', youtube],
  ['Twitter', twitter],
  ['Github', github],
  ['Discord', discord]
].map(([name, href]) => ({
  name: name.toLowerCase(),
  description: `${title} on ${name}`,
  href
}))
