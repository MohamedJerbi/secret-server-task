export interface CreateSecretBody {
  secretText: string;
  expiresAfter: number;
}

export interface Secret {
  secretText: string;
  hash: string;
  createdAt: Date;
  expiresAt: Date;
}

export default Secret;
