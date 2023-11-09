import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ description: 'Bearer hash token' })
  access_token: string;

  @ApiProperty({ description: 'Token expires in number of days' })
  expires_in: number;
}
