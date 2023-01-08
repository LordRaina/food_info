import { Test } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from "../../../src/auth/auth.service"
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../src/users/users.service';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                { provide: UsersService, useValue: {}},
                { provide: JwtService, useValue: {}}
            ],
        }).compile();

        authService = await moduleRef.resolve(AuthService);
        authController = moduleRef.get<AuthController>(AuthController);
    });

    describe('login', () => {
        it('should return the access token from the auth service', async () => {
            const result = { access_token: 'jwt token' };
            const user = { login: 'login', password: 'password' };
            jest.spyOn(authService, 'login').mockImplementation(() => Promise.resolve(result));

            expect(await authController.login(user)).toEqual(result);
        });
    });
});
