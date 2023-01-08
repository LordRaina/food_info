import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';


/**
 * Local strategy used in the LocalAuthGuard that verifies the correctness
 * of the credentials received when signing in.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        // because we want to have "login" field in the body
        // instead of "username"
        super({usernameField: 'login'}); 
    }
    
    /**
     * Validate the combination of the login and the password 
     * @param login 
     * @param password 
     * @returns the User found
     * @throws UnauthorizedException when not found
     */
    async validate(login: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(login, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}