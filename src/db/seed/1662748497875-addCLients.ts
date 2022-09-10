import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCLients1662748497875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO
            clients(name, "lastName", email, dni, "phone", "address", "createdBy" , "updatedBy", "isActive") VALUES ('client1', 'lastClient1', 'client1@gmail.com','12344432', '07271884', 'address 1', 'system', 'system', 'true')`
    );

    await queryRunner.query(
        `INSERT INTO
              clients(name, "lastName", email, dni, "phone", "address", "createdBy" , "updatedBy", "isActive")
              VALUES(
                  'client2',
                  'lastClient2',
                  'client2@gmail.com',
                  '12344452',
                  '07271885',
                  'address 2',
                  'system',
                  'system',
                  'true'
              )`
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
