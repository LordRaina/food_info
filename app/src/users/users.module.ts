import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ParsePasswordPipe } from './pipe/parse-password.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, ParsePasswordPipe],
    exports: [UsersService],
})
export class UsersModule {}
