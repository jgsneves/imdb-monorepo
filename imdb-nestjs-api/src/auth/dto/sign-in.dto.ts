import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { signInValidationMessages } from '../../constants/validation-request-body-messages';

export const signInDto = z.object({
  email: z.string().email({ message: signInValidationMessages.email }),
  password: z.string(),
});

export type SignInDto = z.infer<typeof signInDto>;

export class SignInDtoSwagger {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
