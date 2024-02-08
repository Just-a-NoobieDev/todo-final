import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { User } from 'src/todo/entities/user.entity';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @CurrentUser() user: User,
  ) {
    return this.todoService.create(createTodoInput, user);
  }

  @Query(() => [Todo], { name: 'todo' })
  async findAll(@CurrentUser() user: User): Promise<Todo[]> {
    return this.todoService.findAll(user);
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    return this.todoService.findOne(id, user);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    return this.todoService.update(updateTodoInput, user);
  }

  @Mutation(() => Todo)
  async removeTodo(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.todoService.remove(id, user);
  }
}
