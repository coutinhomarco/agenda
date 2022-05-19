require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
};
const SECRET = process.env.JWT_SECRET;
const generateToken = (payload = {}) => jwt.sign({ data: payload }, SECRET, jwtConfig);

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = await req.headers;   
    if (!authorization) return res.status(401).json({ message: 'Unauthorized' });
    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.tokenData = decoded.data;
    next();
  } catch (error) {
      if (error.name.includes('Token')) {
        return res.status(401).json({ message: 'Expired or invalid token' });
}
      next(error);
  }
};
module.exports = { generateToken, validateToken };