import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpResponse, SigninUserInput } from './auth.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpResponse)
  async signup(
    @Args('login') loginInput: SigninUserInput,
  ): Promise<SignUpResponse> {
    return this.authService.signup(loginInput);
  }
}
