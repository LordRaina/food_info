import { Test } from '@nestjs/testing';
import { User } from '../../../src/users/entities/user.entity';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service'
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserError } from '../../../src/users/users.exception';
import { HttpException } from '@nestjs/common';


describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    const params = { login: 'login', password: 'password' };
    const userData = {id: 1, ...params }

    beforeEach(async () => {
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
            jest.spyOn(usersService, 'create').mockImplementation(() => new Promise((resolve) => resolve(userData)));
            expect(await usersController.create(params)).toEqual(result);
        });

        it('should throw an HTTP error when catching an UserError', async () => {
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