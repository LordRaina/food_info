import * as dotenv from 'dotenv';


dotenv.config(); // loading env variable to get secret key from .env file
export const jwtConstants = {
    secret: process.env.JWT_KEY || 'randomSecretKey',
}
