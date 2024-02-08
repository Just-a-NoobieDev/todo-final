import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEnum, IsUUID, Length } from 'class-validator';
import { TodoStatus } from '../todo-status.enum';

@InputType()
export class UpdateTodoInput {
  @Field(() => ID)
  @IsUUID('4', { each: true })
  id: string;

  @Field({ nullable: true })
  @Length(3, 100)
  title: string;

  @Field({ nullable: true })
  @Length(3, 100)
  description: string;

  @Field()
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
