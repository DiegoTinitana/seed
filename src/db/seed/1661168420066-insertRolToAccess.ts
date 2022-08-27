import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertRolToAccess1661168420066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roles = await queryRunner.query('SELECT * FROM roles');
        const all = roles.map((role: any) => `"${role.id}"`);
        const adminAndSuperAdmin = roles.filter((role: any) => role.name === 'Admin' || role.name === 'SuperAdmin').map((r: any) => `"${r.id}"`);
        const superAdmin = roles.filter((role: any) => role.name === 'SuperAdmin').map((r: any) => `"${r.id}"`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user', 'POST',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user/:id', 'GET',  '[${all}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user/:id', 'PUT',  '[${adminAndSuperAdmin}]')`);
        await queryRunner.query(`INSERT INTO access ("route", "method", "roles") VALUES ('/user/:id', 'DELETE',  '[${superAdmin}]')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
