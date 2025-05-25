import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = {
            userId: decoded.userId || decoded.id,  
        };
        return next(); 
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default authenticateUser;
