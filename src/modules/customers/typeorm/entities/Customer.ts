/* eslint-disable indent */
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn
  } from 'typeorm';
  
  @Entity('customers')
  class Customers {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column()
	name: string;
  
	@Column('decimal')
	price: number;
  
	@Column('int')
	quantity: number;
  
	@CreateDateColumn()
	created_at: Date;
  
	@UpdateDateColumn()
	updated_at: Date;
  }
  
  export  { Customers } ;
  