//auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { EntityManager } from '@mikro-orm/core'; // Assurez-vous que cette ligne est correcte
import { User } from '../user.entity'; // Assurez-vous que cette ligne est correcte


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly em: EntityManager, // Injection du gestionnaire d'entités MikroORM
  ) {}

  async registerUser(username: string, password: string, email: string): Promise<any> {
    // ajouter ici des validations, par exemple, vérifier si l'utilisateur existe déjà
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('email:', email);

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Enregistrer l'utilisateur dans la base de données
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.email = email;

    await this.em.persistAndFlush(user);

    // Retourner l'utilisateur créé (ou une réponse appropriée)
    return user;
  }

  async loginUser(username: string, password: string): Promise<any> {
    // Rechercher l'utilisateur dans la base de données en fonction du nom d'utilisateur
    const user = await this.em.findOne(User, { username });
  
    if (!user) {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }
  
    // Comparer le mot de passe entré avec le mot de passe haché dans la base de données
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }
  
    // Générer un jeton JWT avec les informations de l'utilisateur, y compris l'ID
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
  
    // Retourner le jeton JWT (ou une réponse appropriée)
    return { access_token: accessToken };
  }
  
}
