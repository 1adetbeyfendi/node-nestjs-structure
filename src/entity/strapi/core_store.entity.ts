import { Column, Entity } from "typeorm";

@Entity("core_store")
export class CoreStore {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "key", nullable: true, length: 255 })
  key!: string | null;

  @Column("text", { name: "value", nullable: true })
  value!: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 255 })
  type!: string | null;

  @Column("varchar", { name: "environment", nullable: true, length: 255 })
  environment!: string | null;

  @Column("varchar", { name: "tag", nullable: true, length: 255 })
  tag!: string | null;
}
