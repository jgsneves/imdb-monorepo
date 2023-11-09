import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { createNewVoteMessages } from '../constants/response-messages';
import { PrismaService } from '../prisma/prisma.service';

type CreateVoteData = Omit<Vote, 'createdAt' | 'updatedAt'>;

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  async create(createVoteDto: CreateVoteDto) {
    const { movieId, userId, value } = createVoteDto;

    const vote = await this.prisma.vote.findMany({
      where: {
        movieId,
        userId,
      },
    });

    if (vote.length > 0)
      throw new BadRequestException(
        createNewVoteMessages.ESTE_USUARIO_JA_VOTOU_FILME,
      );

    const data: CreateVoteData = {
      id: uuid(),
      movieId,
      userId,
      value,
    };

    const result = await this.prisma.vote.create({ data });

    return result;
  }

  async findAll(movieIdFilter?: string, userIdFilter?: string) {
    const result = await this.prisma.vote.findMany({
      where: {
        movieId: movieIdFilter,
        userId: userIdFilter,
      },
    });

    return result;
  }

  async findVoteAverageByMovieId(movieId: string) {
    let average = 0;

    const votes = await this.prisma.vote.findMany({
      where: {
        movieId,
      },
      select: {
        value: true,
      },
    });

    if (votes.length === 0)
      return {
        average,
      };

    const sum = votes.reduce((prev, current) => prev + current.value, 0);
    average = sum / votes.length;

    return {
      average,
    };
  }
}
