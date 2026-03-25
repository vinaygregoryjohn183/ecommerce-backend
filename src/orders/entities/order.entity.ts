import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ default: 'pending' })
  status: string;

  // Many Orders belong to One User
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // Many Orders can contain Many Products
  @ManyToMany(() => Product)
  @JoinTable() // Creates a junction table automatically
  products: Product[];
}
