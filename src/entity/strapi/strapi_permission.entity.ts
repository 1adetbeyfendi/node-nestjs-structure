import { Column, Entity } from "typeorm";

@Entity("strapi_permission")
export class StrapiPermission {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "action", length: 255 })
  action!: string;

  @Column("varchar", { name: "subject", nullable: true, length: 255 })
  subject!: string | null;

  @Column("text", { name: "properties", nullable: true })
  properties!: string | null;

  @Column("text", { name: "conditions", nullable: true })
  conditions!: string | null;

  @Column("integer", { name: "role", nullable: true })
  role!: number | null;

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
