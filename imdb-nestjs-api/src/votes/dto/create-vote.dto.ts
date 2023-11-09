import { ApiProperty } from '@nestjs/swagger';
import { Vote } from '@prisma/client';
import { z } from 'zod';

export const createVoteScheme = z.object({
  value: z.number().min(0).max(4),
  userId: z.string().uuid(),
  movieId: z.string().uuid(),
});

export type CreateVoteDto = z.infer<typeof createVoteScheme>;

export class CreateVoteDtoSwagger
  implements Omit<Vote, 'createdAt' | 'updatedAt' | 'id'>
{
  @ApiProperty()
  movieId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  value: number;
}
