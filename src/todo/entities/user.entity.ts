import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Auto generated id for each User' })
  id: string;

  @Column()
  @Field({ description: 'The name of the User' })
  name: string;

  @Column({ unique: true })
  @Field({ description: 'The email of each User' })
  email: string;

  @Column()
  @Field({ description: 'The encrypted password of each User' })
  password: string;

  @Column()
  @Field({ description: 'The date of each User created' })
  date: string;

  @ManyToOne(() => Todo, (todo) => todo.user)
  @Field(() => [Todo])
  todos: Todo;
}
