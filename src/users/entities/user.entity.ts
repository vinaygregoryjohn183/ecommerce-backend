import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users') // This tells Postgres to name the table "users"
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column() // By default, stores as a standard string
  passwordHash: string; // Remember, we never store plain text passwords!

  @CreateDateColumn() // Magically records the exact time the row was inserted
  createdAt: Date;
}
