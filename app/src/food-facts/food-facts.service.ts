import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AppSettings } from '../app.settings'


/**
 * Service that handles the requests to the external OpenFoodFact API
 */
@Injectable()
export class FoodFactsService {
    constructor(private readonly httpService: HttpService) {}
    
    /**
     * Retrieve the related product information from its barcode
     * @param barcode of the food item
     * @returns JSON containing the product information
     */
    findOneByBarcode(barcode: string): Observable<any> { 
        const uri: string = `${AppSettings.FOODFACT_API_ENDPOINT}/${barcode}.json`;
        // TODO catch potential api error 
        return this.httpService.get(encodeURI(uri))
            .pipe(map((axiosResponse: AxiosResponse) => axiosResponse.data));
    }
}
