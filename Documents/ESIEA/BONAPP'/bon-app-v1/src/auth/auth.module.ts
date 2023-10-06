//auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'jwt.config'; // Assurez-vous que votre configuration JWT est correctement importée
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user.entity';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    MikroOrmModule.forFeature({ entities: [User] }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: jwtConfig.signOptions,
    }),
    // Autres modules et services
  ],
  exports: [MikroOrmModule], // Exporter le module si nécessaire
})
export class AuthModule {}
