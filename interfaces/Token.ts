export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface DecodedToken {
  exp?: number;
  [key: string]: any;
}
