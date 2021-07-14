import { Column, Entity } from "typeorm";

@Entity("upload_file_morph")
export class UploadFileMorph {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("integer", { name: "upload_file_id", nullable: true })
  upload_file_id!: number | null;

  @Column("integer", { name: "related_id", nullable: true })
  related_id!: number | null;

  @Column("text", { name: "related_type", nullable: true })
  related_type!: string | null;

  @Column("text", { name: "field", nullable: true })
  field!: string | null;

  @Column("integer", { name: "order", nullable: true })
  order!: number | null;
}
