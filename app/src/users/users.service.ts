import {  Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserError } from './users.exception';


/**
 * Service that handles the database operations related to an User
 */
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    /**
     * 
     * @param createUserDto expected values for creating an user
     * @returns the newly created User
     * @throws UserError if login is already in use
     */
    async create(createUserDto: CreateUserDto) {
        const hasLogin = await this.userRepository.createQueryBuilder()
            .where('LOWER(login) = :login', { login: createUserDto.login.toLowerCase()})
            .getExists();
        if (hasLogin) {
            throw new UserError("Login is already in use");
        }
        return await this.userRepository.save(createUserDto);
    }

    /**
     * Find the user based on the login
     * @param login 
     * @returns User
     */
    findOneByLogin(login: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { login } });
    }

    findAll() {
        return this.userRepository.find();
    }
    
    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }
}
