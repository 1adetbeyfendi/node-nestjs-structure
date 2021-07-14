import { Column, Entity, Index } from "typeorm";

@Index("strapi_administrator_email_unique", ["email"], { unique: true })
@Entity("strapi_administrator")
export class StrapiAdministrator {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "firstname", nullable: true, length: 255 })
  firstname!: string | null;

  @Column("varchar", { name: "lastname", nullable: true, length: 255 })
  lastname!: string | null;

  @Column("varchar", { name: "username", nullable: true, length: 255 })
  username!: string | null;

  @Column("varchar", { name: "email", length: 255, unique: true })
  email!: string;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password!: string | null;

  @Column("varchar", {
    name: "resetPasswordToken",
    nullable: true,
    length: 255,
  })
  resetPasswordToken!: string | null;

  @Column("varchar", { name: "registrationToken", nullable: true, length: 255 })
  registrationToken!: string | null;

  @Column("boolean", { name: "isActive", nullable: true })
  isActive!: boolean | null;

  @Column("boolean", { name: "blocked", nullable: true })
  blocked!: boolean | null;

  @Column("varchar", { name: "preferedLanguage", nullable: true, length: 255 })
  preferedLanguage!: string | null;
}
