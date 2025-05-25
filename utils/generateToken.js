import jwt from 'jsonwebtoken';

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const createToken = (user, tokenKey = TOKEN_KEY, expiresIn = TOKEN_EXPIRY) => {
  try {
    const tokenData = {
      userId: user.id,   // Sequelize user id property
      role: user.role,
    };

    // Generate the token
    const token = jwt.sign(tokenData, tokenKey, { expiresIn });
    return token;
  } catch (error) {
    throw error;
  }
};

export default createToken;
