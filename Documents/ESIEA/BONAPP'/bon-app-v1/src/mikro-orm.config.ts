//mikro-orm.config.ts

import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

const exportOrm = {
    
    driver : PostgreSqlDriver,
    dbName: 'postgres',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    entities: ['../**/*.entity.js'],
    migrations: {
      tableName: 'user',
      path: './migrations',
      pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    debug: process.env.NODE_ENV !== 'production',
};

export default exportOrm;