type GithubProfile = {
  login: string
  id: number
  node_id: string
  avatar_url: string //https://avatars.githubusercontent.com/u/<id>
  gravatar_id: string
  url: string // https://api.github.com/users/<user_id>
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: 'User'
  site_admin: boolean
  name: string
  company: unknown
  blog: ''
  location: unknown
  email: string
  hireable: unknown
  bio: unknown
  twitter_username: unknown
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string //'2011-06-07T21:03:31Z',
  updated_at: string //'2021-08-24T11:39:24Z'
}
