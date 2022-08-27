import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';

export class createUser1660753981705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const role = await queryRunner.query('select * from roles WHERE name = \'Admin\'');
        const password =  bcrypt.hashSync('test1', 10);
        await queryRunner.query(
            `INSERT INTO users(name, "lastName", email, password, dni, "createdBy", "isActive", roles) VALUES ('test1', 'tini', 'test1@gmail.com', '${password}', '12344432', 'system', true, '["${role[0].id}"]')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
