import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';

@ObjectType()
export class SignUpResponse {
  @Field()
  email: string;

  @Field()
  name: string;
}

@InputType()
export class SigninUserInput {
  @Field()
  @IsString()
  @Length(4, 20)
  email: string;

  @Field()
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
