import { Column, Entity } from "typeorm";

@Entity("strapi_webhooks")
export class StrapiWebhooks {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name!: string | null;

  @Column("text", { name: "url", nullable: true })
  url!: string | null;

  @Column("text", { name: "headers", nullable: true })
  headers!: string | null;

  @Column("text", { name: "events", nullable: true })
  events!: string | null;

  @Column("boolean", { name: "enabled", nullable: true })
  enabled!: boolean | null;
}
