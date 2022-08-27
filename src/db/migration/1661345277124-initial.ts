import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1661345277124 implements MigrationInterface {
    name = 'initial1661345277124';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "access" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "route" character varying NOT NULL, "method" character varying NOT NULL, "roles" jsonb, CONSTRAINT "PK_e386259e6046c45ab06811584ed" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "phones" ("type" character varying(40) NOT NULL DEFAULT \'PERSONAL\', "value" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_30d7fc09a458d7a4d9471bda554" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "dni" character varying NOT NULL, "createdBy" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "roles" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_5fe9cfa518b76c96518a206b350" UNIQUE ("dni"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "addresses" ("type" character varying(40) NOT NULL DEFAULT \'PERSONAL\', "value" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "phones" ADD CONSTRAINT "FK_fa1d95d0c615b8f040ae4179955" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"');
        await queryRunner.query('ALTER TABLE "phones" DROP CONSTRAINT "FK_fa1d95d0c615b8f040ae4179955"');
        await queryRunner.query('DROP TABLE "roles"');
        await queryRunner.query('DROP TABLE "addresses"');
        await queryRunner.query('DROP TABLE "users"');
        await queryRunner.query('DROP TABLE "phones"');
        await queryRunner.query('DROP TABLE "access"');
    }

}
