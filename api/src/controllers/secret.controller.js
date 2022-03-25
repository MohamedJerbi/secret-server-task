export const getAllSecrets = (req, res) => {
  res.send('all secrets');
};

export const getSecretByHash = (req, res) => {
  res.send('secret by hash');
};

export const createSecret = (req, res) => {
  res.send('secret added');
};

export default { getAllSecrets, getSecretByHash, createSecret };
