import jwt = require('jsonwebtoken');
import { SECRET } from './config';

export const getTokenFrom = (auth: string | undefined) => {
    let token;
    let decodedToken = undefined;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        token = auth.substring(7);
        decodedToken = jwt.verify(token, SECRET);
    }
    return decodedToken;
};

