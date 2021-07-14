import { Column, Entity, Index } from "typeorm";

@Index("users-permissions_user_username_unique", ["username"], { unique: true })
@Entity("users-permissions_user")
export class UsersPermissionsUser {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "username", length: 255, unique: true })
  username!: string;

  @Column("varchar", { name: "email", length: 255 })
  email!: string;

  @Column("varchar", { name: "provider", nullable: true, length: 255 })
  provider!: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password!: string | null;

  @Column("varchar", {
    name: "resetPasswordToken",
    nullable: true,
    length: 255,
  })
  resetPasswordToken!: string | null;

  @Column("varchar", { name: "confirmationToken", nullable: true, length: 255 })
  confirmationToken!: string | null;

  @Column("boolean", { name: "confirmed", nullable: true })
  confirmed!: boolean | null;

  @Column("boolean", { name: "blocked", nullable: true })
  blocked!: boolean | null;

  @Column("integer", { name: "role", nullable: true })
  role!: number | null;

  @Column("varchar", { name: "firebase_uid", nullable: true, length: 255 })
  firebase_uid!: string | null;

  @Column("text", { name: "claims", nullable: true })
  claims!: string | null;

  @Column("integer", { name: "accId", nullable: true })
  accId!: number | null;

  @Column("integer", { name: "created_by", nullable: true })
  created_by!: number | null;

  @Column("integer", { name: "updated_by", nullable: true })
  updated_by!: number | null;

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
