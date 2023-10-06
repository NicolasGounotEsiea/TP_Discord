// user.entity.ts

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  email!: string;

  // Autres propriétés de l'utilisateur, telles que le rôle, la date d'inscription, etc.
}
