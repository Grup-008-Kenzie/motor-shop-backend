import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1691603291097 implements MigrationInterface {
    name = 'NewMigration1691603291097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_f1d742ff24c13da076eb14dd623"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_9507fd6b6ed56cad872d2ce2e87"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "carIdId"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "UQ_9507fd6b6ed56cad872d2ce2e87"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "imageIdId"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "carId" uuid`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "imageId" uuid`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "UQ_c23f7f4f1d95aef7c4e0306d199" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_b136d165231122e95f01cd7af9f" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_c23f7f4f1d95aef7c4e0306d199" FOREIGN KEY ("imageId") REFERENCES "cars_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_c23f7f4f1d95aef7c4e0306d199"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_b136d165231122e95f01cd7af9f"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "UQ_c23f7f4f1d95aef7c4e0306d199"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "carId"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "imageIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "UQ_9507fd6b6ed56cad872d2ce2e87" UNIQUE ("imageIdId")`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "carIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_9507fd6b6ed56cad872d2ce2e87" FOREIGN KEY ("imageIdId") REFERENCES "cars_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_f1d742ff24c13da076eb14dd623" FOREIGN KEY ("carIdId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
