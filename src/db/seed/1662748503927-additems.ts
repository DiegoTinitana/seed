import { MigrationInterface, QueryRunner } from 'typeorm';

export class additems1662748503927 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO
                  items(id, name, code, "barCode", "hasIva", "purchasePrice", stock,  "pvps")
                  VALUES(
                      'cc196daa-306f-11ed-a261-0242ac120002',
                      'papelera',
                      'I001',
                      'IBC001',
                       true,
                      2.25,
                      0,
                      '[{"id":1, "value": 6.25, "percent": 10}]')`
          );
          await queryRunner.query(
            `INSERT INTO
                  items(id, name, code, "barCode", "hasIva", "purchasePrice", stock,  "pvps")
                  VALUES(
                      '169ee313-384a-4584-ba65-251f4e534ed9',
                      'armador king junnior',
                      'I002',
                      'IBC002',
                       true,
                      2.50,
                      0,
                      '[{"id":1, "value": 2.05, "percent": 10}, {"id":2, "value": 2.70, "percent": 10}]')`
          );
          await queryRunner.query(
            `INSERT INTO
                  items(id, name, code, "barCode", "hasIva", "purchasePrice", stock,  "pvps")
                  VALUES(
                      'ce2d68d2-a431-4a37-a3c7-6d4805dc862b',
                      'termo big home acero',
                      'I003',
                      'IBC003',
                       true,
                      0.10,
                      0,
                      '[{"id":1, "value": 5.80, "percent": 10}]')`
          );
          await queryRunner.query(
            `INSERT INTO
                  items(id, name, code, "barCode", "hasIva", "purchasePrice", stock,  "pvps")
                  VALUES(
                      'd57b8a9c-8cb8-423d-b4a5-a6befea90b4b',
                      'colador de tela',
                      'I004',
                      'IBC004',
                       true,
                      0.10,
                      0,
                      '[{"id":1, "value": 1.16, "percent": 10}]')`
          );

          await queryRunner.query(
            `INSERT INTO
                  items(id, name, code, "barCode", "hasIva", "purchasePrice", stock,  "pvps")
                  VALUES(
                      '7d096b98-3d0f-4aea-ab45-293cefee6dfb',
                      'cuchillo',
                      'I005',
                      'IBC005',
                       true,
                      0.10,
                      0,
                      '[{"id":1, "value": 1.33, "percent": 10}]')`
          );


          await queryRunner.query(
            `INSERT INTO
                  items(id, name, code, "barCode", "hasIva", "purchasePrice", stock,  "pvps")
                  VALUES(
                      '31236f9e-df7d-4aa4-a462-4fa96f026908',
                      'funda industrial',
                      'I006',
                      'IBC006',
                       true,
                      0.10,
                      0,
                      '[{"id":1, "value": 1.07, "percent": 10}]')`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
