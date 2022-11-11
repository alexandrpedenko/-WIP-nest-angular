export interface AuthResponse {
  accessToken: string,
  user: {
    _id: string;
    userName: string;
    email: string;
    refreshToken: string;
  }
}

export interface AuthInput {
  email: string;
  password: string;
  userName?: string;
}

export interface RefreshTokenResponse {
  accessToken: string,
  refreshToken: string;
}
