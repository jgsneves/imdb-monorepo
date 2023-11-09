import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '@prisma/client';

export class CreateMovieResponse implements Movie {
  @ApiProperty()
  actors: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  directorName: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  updatedAt: Date;
}
