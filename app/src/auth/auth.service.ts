import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    /**
     * Valide the potential user through the given credentials
     * @param login 
     * @param password 
     * @returns Promise that'll resolve and return either an user or null
     */
    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByLogin(login);
        // if user has been found, we compare password
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    
    /**
     * Return the JWT access token for the given user
     * @param user 
     * @returns The access_token as an object {access_token: string} 
     */
    async login(user: User) {
        // using `sub` to hold the `id` value to be consistent with JWT standards
        const payload = { login: user.login, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
