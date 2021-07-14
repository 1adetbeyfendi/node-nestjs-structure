import { Column, Entity, Index } from "typeorm";

@Index("i18n_locales_code_unique", ["code"], { unique: true })
@Entity("i18n_locales")
export class I18nLocales {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name!: string | null;

  @Column("varchar", {
    name: "code",
    nullable: true,
    length: 255,
    unique: true,
  })
  code!: string | null;

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
