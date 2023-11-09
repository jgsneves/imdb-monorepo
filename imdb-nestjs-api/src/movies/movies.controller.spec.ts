import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from '../prisma/prisma.service';
import { VotesService } from '../votes/votes.service';
import { JwtService } from '@nestjs/jwt';
import { Movie } from '@prisma/client';
import { v4 as uuid } from 'uuid';

describe('MoviesController', () => {
  let controller: MoviesController;
  let moviesService: MoviesService;
  let votesService: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService, VotesService, PrismaService, JwtService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
    votesService = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(moviesService).toBeDefined();
  });

  it('findAll() should return array of movies', async () => {
    const result: Movie[] = [
      {
        id: '237efa14-7659-4d61-a3e7-c7a58dc15e3f',
        createdAt: new Date('2023-11-02T23:17:13.738Z'),
        updatedAt: new Date('2023-11-02T23:17:13.738Z'),
        name: 'A Grande Escolha',
        releaseDate: new Date('2023-11-02T22:51:26.301Z'),
        genre: 'Drama',
        directorName: 'Ivan Reitman',
        actors: ['Kevin Costner', 'Chadwick Boseman', 'Jennifer Garner'],
      },
      {
        id: '839e03a1-33cc-4108-94b0-4b4e94b0045f',
        createdAt: new Date('2023-11-02T22:58:59.113Z'),
        updatedAt: new Date('2023-11-03T01:15:28.464Z'),
        name: 'O Próprio Enterro',
        releaseDate: new Date('2023-11-02T22:51:26.301Z'),
        genre: 'Ação',
        directorName: 'Maggie Betts',
        actors: ['Jamie Foxx', 'Tommy Lee Jones', 'Jurnee Smollett'],
      },
    ];
    jest.spyOn(moviesService, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('findOne() should return a movie', async () => {
    const result: Movie = {
      id: '839e03a1-33cc-4108-94b0-4b4e94b0045f',
      createdAt: new Date('2023-11-02T22:58:59.113Z'),
      updatedAt: new Date('2023-11-03T01:15:28.464Z'),
      name: 'O Próprio Enterro',
      releaseDate: new Date('2023-11-02T22:51:26.301Z'),
      genre: 'Ação',
      directorName: 'Maggie Betts',
      actors: ['Jamie Foxx', 'Tommy Lee Jones', 'Jurnee Smollett'],
    };

    jest.spyOn(moviesService, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(uuid())).toBe(result);
  });

  it('findOneMovieAverage() should return average score', async () => {
    const result = {
      average: 5,
    };

    jest
      .spyOn(votesService, 'findVoteAverageByMovieId')
      .mockResolvedValue(result);

    expect(await controller.findOneMovieAverage(uuid())).toBe(result);
  });
});
