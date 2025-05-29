import jwt from 'jsonwebtoken'

const JWT_SECRET = 'ERTY$RTR%WEWR';


function generateJWT(payload, expiresIn = '4h') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

function decodeJWT(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; 
    } catch (err) {
        console.error('Invalid token:', err.message);
        return null; 
    }
}

export { generateJWT, decodeJWT };
