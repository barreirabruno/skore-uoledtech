import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class PgContentResource {
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
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
