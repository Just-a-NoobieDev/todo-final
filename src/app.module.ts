import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { Todo } from './todo/entities/todo.entity';
import { User } from './todo/entities/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mongodb',
        url: 'mongodb+srv://admin:admin123@go-cluster.fj3guys.mongodb.net/?retryWrites=true&w=majority',
        synchronize: true,
        autoLoadEntities: true,
        entities: [Todo, User],
      }),
    }),
    TodoModule,
  ],
})
export class AppModule {}
