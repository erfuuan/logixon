import responseBuilder from '../utils/responseBuilder.js'
import { decodeJWT } from '../utils/tokenGenerator.js'



const ignoredPath = ['POST /api/v1/auth/login'];

export default async (req, res, next) => {
    try {
        if (ignoredPath.includes(`${req.method} ${req.originalUrl}`)) { return next(); }
        const accessToken = req.headers.authorization
        if (!accessToken) { return responseBuilder.unauthorized(res) }
        const payload = decodeJWT(accessToken);
        if (payload) {
            return next()
        } else {
            console.log('Invalid or expired token');
            return responseBuilder.unauthorized(res)
        }


    } catch (err) {
        next(err)
    }

}