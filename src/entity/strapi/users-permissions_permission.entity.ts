import { Column, Entity } from "typeorm";

@Entity("users-permissions_permission")
export class UsersPermissionsPermission {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "type", length: 255 })
  type!: string;

  @Column("varchar", { name: "controller", length: 255 })
  controller!: string;

  @Column("varchar", { name: "action", length: 255 })
  action!: string;

  @Column("boolean", { name: "enabled" })
  enabled!: boolean;

  @Column("varchar", { name: "policy", nullable: true, length: 255 })
  policy!: string | null;

  @Column("integer", { name: "role", nullable: true })
  role!: number | null;

  @Column("integer", { name: "created_by", nullable: true })
  created_by!: number | null;

  @Column("integer", { name: "updated_by", nullable: true })
  updated_by!: number | null;
}
