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
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/phone', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/phone/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/phone/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/phone/:id', 'DELETE',  '[${superAdmin}]')`);
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
