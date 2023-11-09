import { ApiProperty } from '@nestjs/swagger';
import { Vote } from '@prisma/client';

export class CreateVoteResponse implements Vote {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  id: string;

  @ApiProperty()
  movieId: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  value: number;
}
