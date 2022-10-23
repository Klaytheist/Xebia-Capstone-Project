export interface AuthToken {
  token: string,
  user : Meta
}

export interface Meta {
  role: string,
  fname: string,
  email: string
}
