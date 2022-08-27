import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUpdateByUser1661431125987 implements MigrationInterface {
    name = 'addUpdateByUser1661431125987';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "users" ADD "updatedBy" character varying');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "updatedBy"');
    }

}
