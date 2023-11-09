import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import {
  CreateVoteDto,
  CreateVoteDtoSwagger,
  createVoteScheme,
} from './dto/create-vote.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ZodValidationPipe } from '../validators/zod-validation-pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVoteResponse } from './response/create-vote-response';
import { FindVoteResponse } from './response/find-vote-response';

@ApiBearerAuth()
@ApiTags('Votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @ApiOperation({ summary: 'Create a new vote' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateVoteResponse,
  })
  @ApiBody({ type: CreateVoteDtoSwagger })
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(createVoteScheme))
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @ApiOperation({ summary: 'Retrieve all votes' })
  @ApiResponse({ type: [FindVoteResponse] })
  @ApiQuery({
    name: 'movieId',
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    required: false,
  })
  @Get()
  findAll(
    @Query('movieId', new ParseUUIDPipe({ optional: true })) movieId?: string,
    @Query('userId', new ParseUUIDPipe({ optional: true })) userId?: string,
  ) {
    return this.votesService.findAll(movieId, userId);
  }
}
