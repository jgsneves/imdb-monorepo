import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';

export class CreateUserResponse implements User {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: $Enums.UserRole;

  @ApiProperty()
  updatedAt: Date;
}
