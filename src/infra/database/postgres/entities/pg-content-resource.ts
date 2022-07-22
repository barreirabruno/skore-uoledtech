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

  @CreateDateColumn({ name: 'createdAt' })
  created_at!: Date

  @UpdateDateColumn({ name: 'updatedAt' })
  updated_at!: Date
}
