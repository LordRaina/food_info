import { Module } from '@nestjs/common';
import { FoodFactsService } from './food-facts.service';
import { FoodFactsController } from './food-facts.controller';
import { HttpModule } from '@nestjs/axios'


@Module({
    imports: [
        HttpModule.register({
            timeout: 10000 // axios by default has no timeout, we don't want to block the server
        })
    ],
    controllers: [FoodFactsController],
    providers: [FoodFactsService]
})
export class FoodFactsModule {}
