export interface UserFromAuth {
  _id: string;
  userName: string;
  email: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserFromAuth;
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
