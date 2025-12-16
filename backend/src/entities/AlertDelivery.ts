import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Alert } from './Alert';
import { Subscriber } from './Subscriber';

@Entity('alert_deliveries')
export class AlertDelivery {
  @PrimaryGeneratedColumn()
  id!: number;

  // Link to Flood Alert
  @ManyToOne(() => Alert, alert => alert.deliveries, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'alert_id' })
  alert!: Alert;

  // Link to Subscriber
  @ManyToOne(() => Subscriber, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'subscriber_id' })
  subscriber!: Subscriber;

  // Delivery channel
  @Column({ default: 'WHATSAPP' })
  channel!: 'WHATSAPP';

  // Delivery status
  @Column({
    type: 'enum',
    enum: ['SENT', 'FAILED'],
    default: 'SENT'
  })
  status!: 'SENT' | 'FAILED';

  // Error (Twilio / network / validation)
  @Column({ name: 'error_message', nullable: true, type: 'text' })
  errorMessage?: string;

  // Timestamp
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
