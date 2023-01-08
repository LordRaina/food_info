import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FoodFactsService } from './food-facts.service';


/**
 * This controller act as a proxy route towards the 
 * OpenFoodFact API where authentication is needed
 */
@Controller('food-facts')
export class FoodFactsController {
    constructor(private readonly foodFactsService: FoodFactsService) {}
    

    @UseGuards(JwtAuthGuard)
    @Get(':barcode')
    findOne(@Param('barcode') barcode: string) {
        return this.foodFactsService.findOneByBarcode(barcode);
    }
}
