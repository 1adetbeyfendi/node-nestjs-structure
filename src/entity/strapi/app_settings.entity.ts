import { Column, Entity } from "typeorm";

@Entity("app_settings")
export class AppSettings {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "sample_settings", nullable: true, length: 255 })
  sample_settings!: string | null;

  @Column("boolean", { name: "bot_status", nullable: true })
  bot_status!: boolean | null;

  @Column("varchar", { name: "key", nullable: true, length: 255 })
  key!: string | null;

  @Column("varchar", { name: "secret", nullable: true, length: 255 })
  secret!: string | null;

  @Column("integer", { name: "created_by", nullable: true })
  created_by!: number | null;

  @Column("integer", { name: "updated_by", nullable: true })
  updated_by!: number | null;
}
