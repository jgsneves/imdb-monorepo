import { User, UserRole } from '@prisma/client';
import { z } from 'zod';
import { createUserValidationMessages } from '../../constants/validation-request-body-messages';
import { PasswordValidation } from '../../validators/password-validation';
import { ApiProperty } from '@nestjs/swagger';

export const createUserSchema = z
  .object({
    email: z.string().email({ message: createUserValidationMessages.email }),
    name: z.string({ required_error: createUserValidationMessages.name }),
    role: z.nativeEnum(UserRole),
    password: z.custom<string>(
      (data) => PasswordValidation.validatePassword(data as string),
      createUserValidationMessages.passwordValidation,
    ),
    confirmPassword: z
      .string()
      .min(12, createUserValidationMessages.passwordLenght),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: createUserValidationMessages.passwordDoesntMatch,
    path: ['confirmPassword'],
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;

export class CreateUserDtoSwager
  implements Omit<User, 'createdAt' | 'id' | 'updatedAt' | 'role' | 'isActive'>
{
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;

  @ApiProperty()
  role: string;
}
