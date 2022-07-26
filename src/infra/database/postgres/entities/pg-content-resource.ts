import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class PgContentResource {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  published!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  type!: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date
}
