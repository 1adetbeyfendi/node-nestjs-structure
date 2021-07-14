export interface JwtPayload {
  id?: number;
  // userId: string;
  userId?: string;

  sub: string;
  username: string;
  roles: string[];
  accId?: number;
}

export interface Payload {
  id?: number;
  userId: string;
  accId?: number;
  username: string;
  roles: string[];
}
