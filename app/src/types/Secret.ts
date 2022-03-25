export interface CreateSecretBody {
  secretText: string;
  expiresAfter: Date;
}

export interface Secret {
  secretText: string;
  hash: string;
  createdAt: Date;
  expiresAt: Date;
}

export default Secret;
