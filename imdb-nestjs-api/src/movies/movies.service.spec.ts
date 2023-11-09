import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { PrismaService } from '../prisma/prisma.service';
import { VotesService } from '../votes/votes.service';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, VotesService, PrismaService],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
