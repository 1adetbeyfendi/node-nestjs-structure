import { UsersPermissionsUser } from 'src/entity/strapi';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user_markets')
export class UserMarkets {
  @Column('integer', { primary: true, name: 'id' })
  id!: number;

  @Column('varchar', { name: 'key', nullable: true, length: 255 })
  key!: string | null;

  @Column('varchar', { name: 'secret', nullable: true, length: 255 })
  secret!: string | null;

  @Column('boolean', { name: 'status', nullable: true })
  status!: boolean | null;

  @Column('integer', { name: 'user', nullable: true })
  @ManyToOne((type) => UsersPermissionsUser, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  // Author: Author;
  user!: UsersPermissionsUser | null;
  // user!: number | null;

  @Column('datetime', { name: 'published_at', nullable: true })
  published_at!: Date | null;

  @Column('integer', { name: 'created_by', nullable: true })
  created_by!: number | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updated_by!: number | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date | null;
}
