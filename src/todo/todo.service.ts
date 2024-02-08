import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { User } from 'src/todo/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  // Create Funtion
  async create(createTodoInput: CreateTodoInput, user: any): Promise<Todo> {
    const { title, description } = createTodoInput;
    const newTodo = this.todoRepository.create({
      title,
      description,
      createdAt: new Date().toISOString(),
      user,
    });

    try {
      await this.todoRepository.save(newTodo);
      return newTodo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // Get All todos Function
  async findAll(user): Promise<Todo[]> {
    const todos = await this.todoRepository.find({ where: { user } });
    if (!todos) {
      throw new InternalServerErrorException();
    }
    return todos;
  }

  // Get each Todo Function
  async findOne(id: string, user: User): Promise<Todo> {
    const todoFound = await this.todoRepository.findOne({
      where: { id, user },
    });

    if (!todoFound) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todoFound;
  }

  // Update Todo Function
  async update(updateTodoInput: UpdateTodoInput, user: User): Promise<Todo> {
    const todo = await this.findOne(updateTodoInput.id, user);
    const { title, description, status } = updateTodoInput;
    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }
    if (status) {
      todo.status = status;
    }

    try {
      await this.todoRepository.save(todo);
      return todo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // Delete Todo Function
  async remove(id: string, user: User): Promise<Todo> {
    const todoFound: Todo = await this.findOne(id, user);
    const removeTodoId = todoFound.id;
    const result: Todo = await this.todoRepository.remove(todoFound);
    if (!result) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    result.id = removeTodoId;
    return result;
  }
}
