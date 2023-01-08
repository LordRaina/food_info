import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

/**
 * Handles the authentication of an user
 */
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Log an user 
     * @param req 
     * @returns the access token returned by the AuthService
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
