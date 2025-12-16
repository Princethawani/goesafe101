import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity()
@Unique(['phone', 'area'])
export class Subscriber {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  phone!: string;

  @Column()
  area!: string;

  @Column({ type: 'enum', enum: ['WHATSAPP'], default: 'WHATSAPP' })
  channel!: 'WHATSAPP';

  @CreateDateColumn()
  createdAt!: Date;
}
