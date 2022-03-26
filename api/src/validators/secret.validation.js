import * as yup from 'yup';

const getSecretSchema = yup.object().shape({
  hash: yup.string().required().length(24),
});

const createSecretSchema = yup.object().shape({
  secretText: yup.string().required(),
  expiresAfter: yup.number().min(0).max(999999999999).required(),
});

export const getSecretValidation = async (req, res, next) => {
  if (await getSecretSchema.isValid(req.params)) {
    return next();
  }
  return res.status(500).send({ error: 'Unvalid hash' });
};

export const createSecretValidation = async (req, res, next) => {
  if (await createSecretSchema.isValid(req.body)) {
    return next();
  }
  return res.status(500).send({
    error: 'Must provide a valid secretText and expiresAfter parameters',
  });
};

export default { getSecretValidation, createSecretValidation };
