import Secret from './secret';

const projection = '-_id hash secretText expiresAt createdAt';

export const getSecretByHash = (hash) => {
  return Secret.findOne({ hash, expiresAt: { $gt: new Date() } })
    .select(projection)
    .exec();
};

export const addSecret = ({ secretText, expiresAt }) => {
  return new Secret({ secretText, expiresAt }).save();
};

export default { getSecretByHash, addSecret };
