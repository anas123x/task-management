/**
 * @file authMiddleware.js
 * @description Middleware to verify the JWT token for protected routes.
 * If a valid token is provided, the request is allowed to proceed; otherwise, a 403 or 401 response is sent.
 */

const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret'; // Secret key used for signing JWT

/**
 * Middleware to verify JWT token.
 * @param {Object} req - Request object containing headers and other metadata.
 * @param {Object} res - Response object to send status and data.
 * @param {Function} next - Function to pass control to the next middleware.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Retrieve the Authorization header
  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Verify the token
    req.user = decoded; // Attach the decoded user data to the request
  } catch (err) {
    console.log(err);
    return res.status(401).send('Invalid Token');
  }
  return next(); // Pass control to the next middleware
};

module.exports = verifyToken; // Export the middleware function
