import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  CreateMovieDto,
  CreateMovieDtoSwagger,
  createMovieSchema,
} from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ZodValidationPipe } from '../validators/zod-validation-pipe';
import { VotesService } from '../votes/votes.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMovieResponse } from './response/create-movie-response';
import { FindMovieResponse } from './response/find-movie-response';
import { VotesAverageResponse } from './response/votes-average-response';
import { EditMovieResponse } from './response/edit-movie-response';

@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly votesService: VotesService,
  ) {}

  @ApiOperation({ summary: 'Create a new movie' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateMovieResponse,
  })
  @ApiBody({ type: CreateMovieDtoSwagger })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ZodValidationPipe(createMovieSchema))
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOperation({ summary: 'Retrieve all movies' })
  @ApiResponse({ type: [FindMovieResponse] })
  @Get()
  @ApiQuery({
    name: 'directorName',
    required: false,
  })
  @ApiQuery({
    name: 'genre',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    required: false,
  })
  @ApiQuery({
    name: 'actors',
    required: false,
  })
  findAll(
    @Query('directorName') directorName?: string,
    @Query('genre') genre?: string,
    @Query('name') name?: string,
    @Query('actors') actors?: string,
  ) {
    const actorsQueryParam = this.mapFindAllActorsQueryParam(actors);

    return this.moviesService.findAll({
      directorNameFilter: directorName,
      genreFilter: genre,
      movieNameFilter: name,
      actorsFilter: actorsQueryParam,
    });
  }

  @ApiOperation({ summary: 'Retrieve a movie by id.' })
  @ApiResponse({ type: FindMovieResponse })
  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.moviesService.findOne(uuid);
  }

  @ApiOperation({ summary: 'Retrieve a movie average vote score.' })
  @ApiResponse({ type: VotesAverageResponse })
  @Get(':uuid/votes-average')
  findOneMovieAverage(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.votesService.findVoteAverageByMovieId(uuid);
  }

  @ApiOperation({ summary: 'Edit a movie retrieved by id.' })
  @ApiResponse({ type: EditMovieResponse })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(uuid, updateMovieDto);
  }

  @ApiOperation({ summary: 'Delete a movie by id.' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.moviesService.remove(uuid);
  }

  private mapFindAllActorsQueryParam(actorsQueryParam?: string) {
    if (actorsQueryParam) return actorsQueryParam.split(',');
    return [];
  }
}
