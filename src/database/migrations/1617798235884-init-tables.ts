import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1617798235884 implements MigrationInterface {
    name = 'initTables1617798235884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "phone_number" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "keys" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_d66070b078b2628e8e2138f63e" UNIQUE ("userId"), CONSTRAINT "PK_e63d5d51e0192635ab79aa49644" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "userSendId" integer, "userReciveId" integer, CONSTRAINT "REL_44964d53b61fe201116b5e491a" UNIQUE ("userSendId"), CONSTRAINT "REL_4f184e7db04c6f8bfdfc77cc6f" UNIQUE ("userReciveId"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "keys" ADD CONSTRAINT "FK_d66070b078b2628e8e2138f63e5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_44964d53b61fe201116b5e491af" FOREIGN KEY ("userSendId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_4f184e7db04c6f8bfdfc77cc6fa" FOREIGN KEY ("userReciveId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_4f184e7db04c6f8bfdfc77cc6fa"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_44964d53b61fe201116b5e491af"`);
        await queryRunner.query(`ALTER TABLE "keys" DROP CONSTRAINT "FK_d66070b078b2628e8e2138f63e5"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "keys"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
