import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn
} from 'typeorm';

@Entity('alerts')
export class Alert {
  @PrimaryColumn()
  id!: string;

  @Column()
  area!: string;

  @Column({ type: 'enum', enum: ['WARNING', 'DANGER'] })
  level!: 'WARNING' | 'DANGER';

  @Column('text')
  message!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
    deliveries: any;
}
