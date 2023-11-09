import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesService } from '../src/movies/movies.service';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../src/app.module';

describe('App suite teste (e2e)', () => {
  let app: INestApplication;
  const moviesService = {
    findAll: () => [
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
    ],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [JwtService],
    })
      .overrideProvider(MoviesService)
      .useValue(moviesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([
        {
          id: '237efa14-7659-4d61-a3e7-c7a58dc15e3f',
          createdAt: '2023-11-02T23:17:13.738Z',
          updatedAt: '2023-11-02T23:17:13.738Z',
          name: 'A Grande Escolha',
          releaseDate: '2023-11-02T22:51:26.301Z',
          genre: 'Drama',
          directorName: 'Ivan Reitman',
          actors: ['Kevin Costner', 'Chadwick Boseman', 'Jennifer Garner'],
        },
        {
          id: '839e03a1-33cc-4108-94b0-4b4e94b0045f',
          createdAt: '2023-11-02T22:58:59.113Z',
          updatedAt: '2023-11-03T01:15:28.464Z',
          name: 'O Próprio Enterro',
          releaseDate: '2023-11-02T22:51:26.301Z',
          genre: 'Ação',
          directorName: 'Maggie Betts',
          actors: ['Jamie Foxx', 'Tommy Lee Jones', 'Jurnee Smollett'],
        },
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
