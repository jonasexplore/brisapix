import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1617792464065 implements MigrationInterface {
    name = 'initTables1617792464065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "phone_number" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "key" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "userId" integer, CONSTRAINT "REL_69572a81a9c722651ca1b44651" UNIQUE ("userId"), CONSTRAINT "PK_5bd67cf28791e02bf07b0367ace" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "userSendId" integer, "userReciveId" integer, CONSTRAINT "REL_54fceddb58a26773e187f80200" UNIQUE ("userSendId"), CONSTRAINT "REL_922d5fefe8642744869f8c5387" UNIQUE ("userReciveId"), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "key" ADD CONSTRAINT "FK_69572a81a9c722651ca1b44651b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_54fceddb58a26773e187f80200c" FOREIGN KEY ("userSendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_922d5fefe8642744869f8c5387f" FOREIGN KEY ("userReciveId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_922d5fefe8642744869f8c5387f"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_54fceddb58a26773e187f80200c"`);
        await queryRunner.query(`ALTER TABLE "key" DROP CONSTRAINT "FK_69572a81a9c722651ca1b44651b"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "key"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
