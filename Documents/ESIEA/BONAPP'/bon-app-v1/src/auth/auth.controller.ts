//auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    const { username, password, email } = userDto; // Extraire le nom d'utilisateur et le mot de passe du DTO
    await this.authService.registerUser(username, password, email);
    // Retourner une réponse appropriée
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    const { username, password } = userDto;
    const result = await this.authService.loginUser(username, password);
    // Retourner une réponse appropriée
  }
}
