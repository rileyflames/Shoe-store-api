import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // 1) Get token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authorization token is missing or malformed'
    });
  }

  const token = authHeader.split(' ')[1]; // Get token after 'Bearer'

  try {
    // ✅ 2) Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 3) Attach user info from token to req.user
    req.user = {
      id: decoded.userId,
      role: decoded.role
    };

    // ✅ 4) Pass control to next route handler
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};

export default authMiddleware;
