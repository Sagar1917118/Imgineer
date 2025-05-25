const jwt =require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';



const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.id) {
      return res.status(403).json({ error: 'Invalid token: userId not found' });
    }
    
    req.params.userId = decoded.id;
    req.headers['x-api-key']=decoded.apiKey;
    // req.params.apiKey=decoded.apiKey;

    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports={verifyToken}