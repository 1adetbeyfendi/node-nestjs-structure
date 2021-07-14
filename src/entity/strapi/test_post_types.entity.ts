import { Column, Entity } from "typeorm";

@Entity("test_post_types")
export class TestPostTypes {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "sdfgsdfhsd", nullable: true, length: 255 })
  sdfgsdfhsd!: string | null;

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
