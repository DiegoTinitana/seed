import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertRolToAccess1661168420066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roles = await queryRunner.query('SELECT * FROM roles');
        const all = roles.map((role: any) => `"${role.id}"`);
        const adminAndSuperAdmin = roles.filter((role: any) => role.name === 'Admin' || role.name === 'SuperAdmin').map((r: any) => `"${r.id}"`);
        const superAdmin = roles.filter((role: any) => role.name === 'SuperAdmin').map((r: any) => `"${r.id}"`);
          /*users*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user/:id', 'DELETE',  '[${superAdmin}]')`);
        /*phones*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/phone', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/phone/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        /*address*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/address', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/address', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/address/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/address/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/address/:id', 'DELETE',  '[${superAdmin}]')`);
        /*client*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/client', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/client', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/client/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/client/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/client/:id', 'DELETE',  '[${superAdmin}]')`);
        /*providers*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/provider', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/provider', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/provider/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/provider/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/provider/:id', 'DELETE',  '[${superAdmin}]')`);
        /*providers*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/access', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/access', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/access/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/access/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/access/:id', 'DELETE',  '[${superAdmin}]')`);
        /*roles*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/role', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/role', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/role/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/role/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/role/:id', 'DELETE',  '[${superAdmin}]')`);
        /*items*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/item', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/item', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/item/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/item/code', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/item/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/item/categories', 'POST',  '[${adminAndSuperAdmin}]')`);
        /*category*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/category', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/category', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/category/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/category/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/category/:id', 'DELETE',  '[${superAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/category/items', 'POST',  '[${adminAndSuperAdmin}]')`);
        /*category*/
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/sales', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/sales', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/sales/user', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/sales/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/sales/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
