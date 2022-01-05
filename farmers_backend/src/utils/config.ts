// Config for the backend
import dotenv = require('dotenv');
dotenv.config();

export const MONGODB = process.env.MONGODB_URI as string;

export const PORT = process.env.PORT as number | undefined;