import { Column, Entity } from "typeorm";

@Entity("upload_file")
export class UploadFile {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @Column("varchar", { name: "alternativeText", nullable: true, length: 255 })
  alternativeText!: string | null;

  @Column("varchar", { name: "caption", nullable: true, length: 255 })
  caption!: string | null;

  @Column("integer", { name: "width", nullable: true })
  width!: number | null;

  @Column("integer", { name: "height", nullable: true })
  height!: number | null;

  @Column("text", { name: "formats", nullable: true })
  formats!: string | null;

  @Column("varchar", { name: "hash", length: 255 })
  hash!: string;

  @Column("varchar", { name: "ext", nullable: true, length: 255 })
  ext!: string | null;

  @Column("varchar", { name: "mime", length: 255 })
  mime!: string;

  @Column("float", { name: "size" })
  size!: number;

  @Column("varchar", { name: "url", length: 255 })
  url!: string;

  @Column("varchar", { name: "previewUrl", nullable: true, length: 255 })
  previewUrl!: string | null;

  @Column("varchar", { name: "provider", length: 255 })
  provider!: string;

  @Column("text", { name: "provider_metadata", nullable: true })
  provider_metadata!: string | null;

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
