import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sampletable2')
export class Sampletable2 {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'title' })
  title!: string;

  @Column('text', { nullable: true, name: 'content' })
  content?: string;

  @Column('date', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updated_at!: Date;

  @Column('date', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  created_at!: Date;
}
