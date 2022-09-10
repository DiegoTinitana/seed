**MIGRATION**
* create migration by entitie: npx typeorm-ts-node-commonjs migration:generate ./src/db/migration/initial -d ./src/db/ormconfig.ts
* create new migration: npx typeorm migration:create ./src/db/migration/addAccess
* create seed:  npx typeorm migration:create ./src/db/seed/{seedName}
* Para generar una nueva ruta con accesos primero hay que ejecutar una migracion y poner las nuevas rutas