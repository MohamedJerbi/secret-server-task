import axios from "axios";
import { Secret, CreateSecretBody } from "../types/Secret";

export const createSecret: (secret: CreateSecretBody) => Promise<Secret> = (
  secret: CreateSecretBody
) => {
  const baseURL: string = "http://localhost:3333/secret";
  return axios.post(baseURL, secret);
};
