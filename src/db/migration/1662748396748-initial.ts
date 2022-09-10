import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1662748396748 implements MigrationInterface {
    name = 'initial1662748396748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phones" ("type" character varying(40) NOT NULL DEFAULT 'PERSONAL', "value" character varying NOT NULL, "description" character varying, "createdBy" character varying NOT NULL, "updatedBy" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_30d7fc09a458d7a4d9471bda554" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "dni" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "password" character varying NOT NULL, "roles" jsonb, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_5fe9cfa518b76c96518a206b350" UNIQUE ("dni"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("type" character varying(40) NOT NULL DEFAULT 'PERSONAL', "value" character varying NOT NULL, "description" character varying, "createdBy" character varying NOT NULL, "updatedBy" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "access" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "route" character varying NOT NULL, "method" character varying NOT NULL, "roles" jsonb, CONSTRAINT "PK_e386259e6046c45ab06811584ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill_of_sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dni" character varying NOT NULL, "address" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "taxSubTotal" numeric(10,8) NOT NULL DEFAULT '0', "zeroSubTotal" numeric(10,8) NOT NULL DEFAULT '0', "discountTota" numeric(10,8) NOT NULL DEFAULT '0', "tax" numeric(10,8) NOT NULL DEFAULT '0', "total" numeric(10,8) NOT NULL DEFAULT '0', "createdBy" character varying NOT NULL DEFAULT true, "updatedBy" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "isActive" boolean NOT NULL, CONSTRAINT "PK_27d33415046e6d36d6d7f9e3cda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill_of_sales_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "detail" character varying NOT NULL, "unitPrice" numeric(10,8) NOT NULL DEFAULT '0', "tax" numeric(10,8) NOT NULL DEFAULT '0', "discount" numeric(10,8) NOT NULL DEFAULT '0', "total" numeric(10,8) NOT NULL DEFAULT '0', "billId" uuid, CONSTRAINT "PK_1932b2b0134b8b55bf041bafd4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "dni" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "phone" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "UQ_8e645da308339e84f45d6cfe5d4" UNIQUE ("dni"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "code" character varying, "barCode" character varying, "hasIva" boolean NOT NULL DEFAULT false, "purchasePrice" integer NOT NULL DEFAULT '0', "stock" integer NOT NULL DEFAULT '0', "pvps" jsonb NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "photo" character varying, CONSTRAINT "UQ_1b0a705ce0dc5430c020a0ec31f" UNIQUE ("code"), CONSTRAINT "UQ_11abb312596a806f1a1ddd8f9d8" UNIQUE ("barCode"), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdBy" character varying NOT NULL, "updatedBy" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "dni" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "company" character varying NOT NULL, CONSTRAINT "UQ_92771edc46a8f06892ed72cdf4f" UNIQUE ("email"), CONSTRAINT "UQ_91069bf4ad91f4eaae05467a876" UNIQUE ("dni"), CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items_categories_categories" ("itemsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_51fc969b8a862177bd83aa39c0c" PRIMARY KEY ("itemsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd3a7d15457b9e010229a7918c" ON "items_categories_categories" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_79e54354b90b7e850d8370c9cb" ON "items_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "phones" ADD CONSTRAINT "FK_fa1d95d0c615b8f040ae4179955" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill_of_sales_detail" ADD CONSTRAINT "FK_9f5f4e406572859a6b89cde2671" FOREIGN KEY ("billId") REFERENCES "bill_of_sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_categories_categories" ADD CONSTRAINT "FK_cd3a7d15457b9e010229a7918c7" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items_categories_categories" ADD CONSTRAINT "FK_79e54354b90b7e850d8370c9cb5" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_categories_categories" DROP CONSTRAINT "FK_79e54354b90b7e850d8370c9cb5"`);
        await queryRunner.query(`ALTER TABLE "items_categories_categories" DROP CONSTRAINT "FK_cd3a7d15457b9e010229a7918c7"`);
        await queryRunner.query(`ALTER TABLE "bill_of_sales_detail" DROP CONSTRAINT "FK_9f5f4e406572859a6b89cde2671"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "phones" DROP CONSTRAINT "FK_fa1d95d0c615b8f040ae4179955"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_79e54354b90b7e850d8370c9cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd3a7d15457b9e010229a7918c"`);
        await queryRunner.query(`DROP TABLE "items_categories_categories"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "bill_of_sales_detail"`);
        await queryRunner.query(`DROP TABLE "bill_of_sales"`);
        await queryRunner.query(`DROP TABLE "access"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "phones"`);
    }

}
