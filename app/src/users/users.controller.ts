import { Controller,  Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParsePasswordPipe } from './pipe/parse-password.pipe';
import { UserError } from './users.exception';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    /**
     * Hashes the password and creates an user to the database 
     * @param createUserDto user data
     * @returns JSON containing a positive answer
     * @throws HttpException | error
     */
    @Post()
    async create(@Body(ParsePasswordPipe) createUserDto: CreateUserDto) {
        try {
            await this.usersService.create(createUserDto);
            return {'success': 'Your account has been created !'};
        } catch (error) {
            if (error instanceof UserError) {
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: error.message,
                }, HttpStatus.CONFLICT);    
            }
            throw error;
        };         
    }
}
