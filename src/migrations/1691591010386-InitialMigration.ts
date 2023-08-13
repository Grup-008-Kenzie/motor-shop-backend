import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1691591010386 implements MigrationInterface {
    name = 'InitialMigration1691591010386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announcements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" character varying(4) NOT NULL, "fuel_type" character varying(10) NOT NULL, "kilometer" character varying(6) NOT NULL, "color" character varying(30) NOT NULL, "fipe_price" character varying(10) NOT NULL, "price" character varying(10) NOT NULL, "description" character varying(100) NOT NULL, "carIdId" uuid, CONSTRAINT "PK_b3ad760876ff2e19d58e05dc8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(20) NOT NULL, "model" character varying(20) NOT NULL, "front_image" character varying(255) NOT NULL, "first_image" character varying(255) NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_f1d742ff24c13da076eb14dd623" FOREIGN KEY ("carIdId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_f1d742ff24c13da076eb14dd623"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "announcements"`);
    }

}
