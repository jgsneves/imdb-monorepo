import { Injectable } from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PrismaService } from '../prisma/prisma.service';

type OmitMovieData = Omit<Movie, 'createdAt' | 'updatedAt' | 'releaseDate'>;

interface CreateMovieData extends OmitMovieData {
  releaseDate: string;
}

interface FindAllQueryParams {
  directorNameFilter?: string;
  movieNameFilter?: string;
  genreFilter?: string;
  actorsFilter: string[];
}

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const { actors, directorName, genre, name, releaseDate } = createMovieDto;
    const data: CreateMovieData = {
      actors,
      directorName,
      genre,
      id: uuid(),
      name,
      releaseDate,
    };

    const result = await this.prisma.movie.create({
      data,
    });

    return result;
  }

  async findAll(queryParams: FindAllQueryParams) {
    const whereClause = this.buildFindAllWhereClause(queryParams);

    const result = await this.prisma.movie.findMany({
      where: whereClause,
    });

    return result;
  }

  async findOne(guid: string) {
    const result = await this.prisma.movie.findUnique({ where: { id: guid } });

    return result;
  }

  async update(guid: string, updateMovieDto: UpdateMovieDto) {
    const result = await this.prisma.movie.update({
      where: { id: guid },
      data: { ...updateMovieDto },
    });

    return result;
  }

  async remove(guid: string) {
    await this.prisma.movie.delete({ where: { id: guid } });
  }

  private buildFindAllWhereClause(queryParams: FindAllQueryParams) {
    const result = {};

    if (queryParams.actorsFilter.length > 0) {
      Object.assign(result, {
        actors: {
          hasSome:
            queryParams.actorsFilter.length > 0
              ? queryParams.actorsFilter
              : undefined,
        },
      });
    }

    if (queryParams.directorNameFilter) {
      Object.assign(result, {
        directorName: {
          contains: queryParams.directorNameFilter,
          mode: 'insensitive',
        },
      });
    }

    if (queryParams.genreFilter) {
      Object.assign(result, {
        genre: {
          contains: queryParams.genreFilter,
          mode: 'insensitive',
        },
      });
    }

    if (queryParams.movieNameFilter) {
      Object.assign(result, {
        name: {
          contains: queryParams.movieNameFilter,
          mode: 'insensitive',
        },
      });
    }

    return result;
  }
}
