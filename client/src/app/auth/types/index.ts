export interface AuthResponse {
  access_token: string
}

export interface AuthInput {
  email: string;
  password: string;
  userName?: string;
}
