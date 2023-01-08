import { Test } from '@nestjs/testing';
import { AuthService } from "../../../src/auth/auth.service"
import { UsersService } from "../../../src/users/users.service"
import { User } from '../../../src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    const login = 'login';
    const password = 'password';
    const user: User = { id: 1, login, password };

    beforeEach(async() => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService, 
                UsersService, 
                JwtService,
                {provide: getRepositoryToken(User), useValue: {}},
            ],
        }).compile();

        authService = await moduleRef.resolve(AuthService);
        usersService = await moduleRef.resolve(UsersService);
        jwtService = await moduleRef.resolve(JwtService);
    });

    describe('validateUser', () => {
        it('should return user if credentials are matching', async () => {
            jest.spyOn(usersService, 'findOneByLogin').mockImplementation(() => Promise.resolve(user));
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
            
            expect(await authService.validateUser(login, password)).toEqual(user);
        });

        it('should return null if user is not found', async () => {
            jest.spyOn(usersService, 'findOneByLogin').mockImplementation(() => Promise.resolve(null));
            
            expect(await authService.validateUser(login, password)).toBeNull();
        });
        
        it('should return null if password is not matching', async () => {
            jest.spyOn(usersService, 'findOneByLogin').mockImplementation(() => Promise.resolve(user));
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

            expect(await authService.validateUser(login, password)).toBeNull();
        });
    });

    describe('login', () => {
        it('should return the access token given by the JwtService', async () => {
            const token = 'jwt token';
            const result = { access_token: token };
            jest.spyOn(jwtService, 'sign').mockImplementation(() => 'jwt token');

            expect(await authService.login(user)).toEqual(result);
        })
    })

});
