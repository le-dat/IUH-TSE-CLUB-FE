export interface ITokens {
  access_token: string
  refresh_token: string
}

export interface IUser {
  _id: string
  name: string
  email: string
}

export interface IUserWithPassword extends IUser {
  password: string
}
