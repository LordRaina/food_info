import { Test } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service'
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserError } from '../users.exception';
import { HttpException } from '@nestjs/common';


describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let userData: User;

    beforeEach(async () => {
        userData = {id: 1, login: 'login', password: 'password' }
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, {provide: getRepositoryToken(User), useValue: {}}],
        }).compile();

        usersService = await moduleRef.resolve(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
    });

    describe('create', () => {
        it('should return a success', async () => {
            const result = {'success': 'Your account has been created !'};
            const params = { login: 'login', password: 'password' };
            jest.spyOn(usersService, 'create').mockImplementation(() => new Promise((resolve) => resolve(userData)));
            expect(await usersController.create(params)).toEqual(result);
        });

        it('should throw an HTTP error when catching an UserError', async () => {
            const params = { login: 'login', password: 'password' };
            jest.spyOn(usersService, 'create').mockImplementation(() => {throw new UserError('')});
            try {
                await usersController.create(params);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
            }
            // TODO debug below line
            // expect(await usersController.create(params)).toThrow(HttpException);
        })
    });
});