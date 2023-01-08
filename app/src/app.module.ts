import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FoodFactsModule } from './food-facts/food-facts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AppSettings } from './app.settings';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite', // using sqlite because it's a very small app for demonstration
            database: `${AppSettings.ROOT_DIRECTORY}/../db/food_info.db`,
            entities: [User], // since i'm using webpack for hot reload module, passing files doesn't work
            synchronize: true, // to not use in prod because it'll sync the schema whenever the app is starting
        }),
        UsersModule, 
        FoodFactsModule,
        AuthModule],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}


             