export interface AccessTokenPayload {
  sub: string; // usuario id
  email: string;
}

export interface ITokenService {
  generateAccessToken(payload: AccessTokenPayload): string;
  verifyAccessToken(token: string): AccessTokenPayload;
  generateOpaqueToken(): string;
  hashToken(token: string): string;
}
