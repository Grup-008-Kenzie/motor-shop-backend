import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialmigration1691707788509 implements MigrationInterface {
    name = 'Initialmigration1691707788509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(20) NOT NULL, "model" character varying(20) NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "front_image" character varying(255) NOT NULL, "first_image" character varying(255) NOT NULL, "second_image" character varying(255) NOT NULL, CONSTRAINT "PK_6180002831bf7873c4c37d7a5a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" character varying(4) NOT NULL, "fuel_type" character varying(10) NOT NULL, "kilometer" character varying(6) NOT NULL, "color" character varying(30) NOT NULL, "fipe_price" character varying(10) NOT NULL, "price" character varying(10) NOT NULL, "description" character varying(100) NOT NULL, "carId" uuid, "imageId" uuid, "sellerId" uuid, CONSTRAINT "REL_c23f7f4f1d95aef7c4e0306d19" UNIQUE ("imageId"), CONSTRAINT "PK_b3ad760876ff2e19d58e05dc8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(90) NOT NULL, "email" character varying(125) NOT NULL, "cpf" character varying(11) NOT NULL, "phone_number" character varying(11) NOT NULL, "birthdate" character varying(8) NOT NULL DEFAULT now(), "description" text, "is_seller" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(30) NOT NULL, "street" character varying(10) NOT NULL, "number" character varying(10) NOT NULL, "complement" character varying(50) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_b136d165231122e95f01cd7af9f" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_c23f7f4f1d95aef7c4e0306d199" FOREIGN KEY ("imageId") REFERENCES "cars_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_a31ce09c36b24db85eec006014a" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_a31ce09c36b24db85eec006014a"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_c23f7f4f1d95aef7c4e0306d199"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_b136d165231122e95f01cd7af9f"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "announcements"`);
        await queryRunner.query(`DROP TABLE "cars_images"`);
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
