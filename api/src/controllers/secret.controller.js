import { getSecretByHash, addSecret } from '../models/crud';

const handleFail = (res, status, message) => {
  res.status(status || 500).send({ error: message || 'An error occured' });
};

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
    console.log(
      new Date(),
      expiresAfter,
      new Date(new Date().getTime() + expiresAfter * 1000)
    );
    addSecret({
      secretText,
      expiresAt: new Date(new Date().getTime() + expiresAfter * 1000),
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
