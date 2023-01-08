import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from "../../../src/users/users.service"
import { User } from '../../../src/users/entities/user.entity';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { UserError } from '../../../src/users/users.exception';


describe('UsersService', () => {
    let usersService: UsersService;

    const createQueryBuilder = jest.fn();
    const where = jest.fn();
    const getExists = jest.fn();
    const queryResult = {
        where,
        getExists,
    };
    createQueryBuilder.mockImplementation(() => queryResult);
    where.mockImplementation(() => queryResult);

    const userRepository = { 
        createQueryBuilder, 
        save: jest.fn(),
        findOne: jest.fn(),
    };

    beforeEach(async() => {
        const moduleRef = await Test.createTestingModule({
            providers: [UsersService, {provide: getRepositoryToken(User), useValue: userRepository}],
        }).compile();

        usersService = await moduleRef.resolve(UsersService);
    });

    describe('create', () => {
        it('should return the newly created user', async () => {
            const userDto: CreateUserDto = { login: 'login', password: 'password'};
            const user: User = { id: 1, login: 'login', password: 'password'};
            getExists.mockImplementation(() => false);
            jest.spyOn(userRepository, 'save').mockImplementation(() => user);
            
            expect(await usersService.create(userDto)).toEqual(user);
        });

        it('should return an UserError because login is not available', async () => {
            const userDto: CreateUserDto = { login: 'login', password: 'password'};
            getExists.mockImplementation(() => true);
            try {
                await usersService.create(userDto);
            } catch (error) {
                expect(error).toBeInstanceOf(UserError);
            }
        })
    });

    describe('findOneByLogin', () => {
        it('should return the user found', async () => {
            const login = 'login';
            const user: User = { id: 1, login, password: 'password'};
            jest.spyOn(userRepository, 'findOne').mockImplementation(() => user);
            
            expect(await usersService.findOneByLogin(login)).toEqual(user);
        });

        it('should return null when user not found', async () => {
            const login = 'login';
            jest.spyOn(userRepository, 'findOne').mockImplementation(() => null);
            
            expect(await usersService.findOneByLogin(login)).toBeNull();
        });
    });

});
