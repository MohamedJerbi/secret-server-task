import { getSecretByHash, addSecret } from '../models/crud';

const handleFail = (res, status, message) => {
  res.status(status || 500).send({ error: message || 'An error occured' });
};

const maximumDate = new Date(9999, 0, 0);

export const getSecret = async (req, res) => {
  try {
    const secret = await getSecretByHash(req.params.hash);
    if (secret) {
      return res.status(200).send(secret);
    }
    return handleFail(res, 404, "Secret doesn't exist or expired");
  } catch (e) {
    return handleFail(res);
  }
};

export const createSecret = (req, res) => {
  try {
    const { secretText, expiresAfter } = req.body;
    addSecret({
      secretText,
      expiresAt:
        // if expiresAfter is 0 then we use a maximum dateit has no expiration date and we use maximum date
        (expiresAfter &&
          new Date(new Date().getTime() + expiresAfter * 1000)) ||
        maximumDate,
    })
      .then(({ hash, secretText, expiresAt, createdAt }) => {
        return res.status(200).send({ hash, secretText, expiresAt, createdAt });
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    console.log('Error at createSecret: ', e);
    return handleFail(res);
  }
};

export default { getSecret, createSecret };
