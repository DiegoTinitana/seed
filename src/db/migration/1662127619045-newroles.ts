import { MigrationInterface, QueryRunner } from 'typeorm';

export class newroles1662127619045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('INSERT INTO roles (name) VALUES (\'SuperAdmin\')');
        await queryRunner.query('INSERT INTO roles (name) VALUES (\'Admin\')');
        await queryRunner.query('INSERT INTO roles (name) VALUES (\'Guest\')');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
