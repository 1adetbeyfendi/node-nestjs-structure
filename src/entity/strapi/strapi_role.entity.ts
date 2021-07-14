import { Column, Entity, Index } from "typeorm";

@Index("strapi_role_code_unique", ["code"], { unique: true })
@Index("strapi_role_name_unique", ["name"], { unique: true })
@Entity("strapi_role")
export class StrapiRole {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255, unique: true })
  name!: string;

  @Column("varchar", { name: "code", length: 255, unique: true })
  code!: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description!: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at!: Date | null;
}
