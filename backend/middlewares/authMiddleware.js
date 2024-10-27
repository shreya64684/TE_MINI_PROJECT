const jwt = require('jsonwebtoken');

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token);
  
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    req.user = decoded; // Attach decoded token to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to verify user role
const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };
