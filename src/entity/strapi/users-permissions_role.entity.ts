import { Column, Entity, Index } from "typeorm";

@Index("users-permissions_role_type_unique", ["type"], { unique: true })
@Entity("users-permissions_role")
export class UsersPermissionsRole {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description!: string | null;

  @Column("varchar", {
    name: "type",
    nullable: true,
    length: 255,
    unique: true,
  })
  type!: string | null;

  @Column("integer", { name: "created_by", nullable: true })
  created_by!: number | null;

  @Column("integer", { name: "updated_by", nullable: true })
  updated_by!: number | null;
}
