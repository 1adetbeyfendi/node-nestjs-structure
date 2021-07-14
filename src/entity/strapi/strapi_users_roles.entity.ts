import { Column, Entity } from "typeorm";

@Entity("strapi_users_roles")
export class StrapiUsersRoles {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("integer", { name: "user_id", nullable: true })
  user_id!: number | null;

  @Column("integer", { name: "role_id", nullable: true })
  role_id!: number | null;
}
