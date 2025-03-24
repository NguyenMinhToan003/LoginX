const { userModel } = require('~/models/userModel');

export const authAddUserClient = async (req, res, next) => {
  const { clientId } = req.query;
  if (!clientId) {
    return res.status(400).json({ message: 'Client ID is required' });
  }
  const client = await userModel.findUserById(clientId);
  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }
  req.clientId = client._id
  console.log('req.clientId', req.clientId)
  next();
};