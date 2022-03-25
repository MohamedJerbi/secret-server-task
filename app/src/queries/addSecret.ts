import axios, { AxiosRequestConfig } from "axios";
import Secret, { CreateSecretBody } from "../types/Secret";
import { API_URL } from "../config/defaultConfigs";

interface AxiosRequestConfigSecret extends AxiosRequestConfig {
  data: Secret;
}

export const createSecret: (
  secret: CreateSecretBody
) => Promise<AxiosRequestConfigSecret> = (secret: CreateSecretBody) => {
  return axios.post(process.env.API_URL || API_URL, secret);
};

export default createSecret;
