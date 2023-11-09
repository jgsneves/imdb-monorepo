import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaService } from '../prisma/prisma.service';
import { VotesService } from '../votes/votes.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, VotesService, PrismaService],
})
export class MoviesModule {}
