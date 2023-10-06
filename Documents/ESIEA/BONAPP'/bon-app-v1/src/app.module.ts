import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity'; // Assurez-vous d'importer votre entité User
import  exportOrm from './mikro-orm.config';


import jwtConfig from 'jwt.config'; // Importez votre configuration JWT ici

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MikroOrmModule.forRoot(exportOrm),
    AuthModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: jwtConfig.signOptions,
    }),
    // Autres modules et services
  ],
  exports: [MikroOrmModule], // Exportez le module si nécessaire
})
export class AppModule {}
