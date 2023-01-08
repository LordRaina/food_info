import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';


/**
 * Strategy used for the JWT mechanism. For protected routes, it 
 * validates the authenticity of the given token
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false, // delegate the check of JWT has not expired to the Passport module
        secretOrKey: jwtConstants.secret,
    });
}
    /**
     * This method is invoked after the Passport has verified the JWT signatures
     * and has decoded the JSON
     * @param payload decoded JSON given by the passport
     * @returns id and login of the user
     */
    async validate(payload: any) {
        return { id: payload.sub, login: payload.login };
    }
}