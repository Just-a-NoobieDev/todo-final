import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/todo/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from '../todo-status.enum';

@Entity()
@ObjectType('Todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Auto generated id for each Todo' })
  id: string;

  @Column()
  @Field({ description: 'The title of the Todo' })
  title: string;

  @Column()
  @Field({ description: 'The description of each Todo' })
  description: string;

  @Column()
  @Field({ description: 'The status of each Todo' })
  status: TodoStatus;

  @Column()
  @Field({ description: 'The date of each Todo created' })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.todos)
  @Field(() => User)
  user: User;
}
