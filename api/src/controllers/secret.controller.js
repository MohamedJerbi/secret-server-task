import { getSecretByHash, addSecret } from '../models/crud';

const handleFail = (res, msg) => {
  res.send(msg || 'An error occured');
};

export const getSecret = (req, res) => {
  try {
    getSecretByHash(req.params.hash)
      .then((r) => res.send(r))
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    console.log('Error at getSecret: ', e);
    handleFail(res);
  }
};

export const createSecret = (req, res) => {
  try {
    addSecret(req.body)
      .then((r) => res.send(r))
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    console.log('Error at createSecret: ', e);
    handleFail(res);
  }
};

export default { getSecret, createSecret };
