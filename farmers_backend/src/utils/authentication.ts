import jwt = require('jsonwebtoken');
import { SECRET } from './config';

//Provides bearer token extraction from authentication. This could be used as a middleware as well.
export const getTokenFrom = (auth: string | undefined) => {
    let token;
    let decodedToken = undefined;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        token = auth.substring(7);
        decodedToken = jwt.verify(token, SECRET);
    }
    return decodedToken;
};

