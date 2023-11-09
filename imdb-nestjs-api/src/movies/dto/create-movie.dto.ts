import { z } from 'zod';
import { createMovieValidationMessages } from '../../constants/validation-request-body-messages';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '@prisma/client';

export const createMovieSchema = z.object({
  name: z.string({ required_error: createMovieValidationMessages.name }),
  releaseDate: z.string().datetime({
    message: createMovieValidationMessages.releaseDate,
  }),
  genre: z.string({ required_error: createMovieValidationMessages.genre }),
  directorName: z.string({
    required_error: createMovieValidationMessages.directorName,
  }),
  actors: z.string().array().nonempty({
    message: createMovieValidationMessages.actors,
  }),
});

export type CreateMovieDto = z.infer<typeof createMovieSchema>;

export class CreateMovieDtoSwagger
  implements Omit<Movie, 'createdAt' | 'updatedAt' | 'id'>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  directorName: string;

  @ApiProperty({ type: [String] })
  actors: string[];
}
