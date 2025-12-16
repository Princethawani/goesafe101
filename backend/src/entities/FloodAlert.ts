import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { AlertDelivery } from './AlertDelivery';

@Entity()
export class FloodAlert {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  area!: string;

  @Column()
  riskLevel!: 'LOW' | 'MEDIUM' | 'HIGH' | 'SEVERE';

  @Column()
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => AlertDelivery, delivery => delivery.alert)
  deliveries!: AlertDelivery[];
}
