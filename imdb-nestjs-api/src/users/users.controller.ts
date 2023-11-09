import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserDto,
  CreateUserDtoSwager,
  createUserSchema,
} from './dto/create-user-schema';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ZodValidationPipe } from '../validators/zod-validation-pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserResponse } from './response/create-user-response';
import { FindUserResponse } from './response/find-user-response';
import { UpdateUserResponse } from './response/update-user-response';
import { InactivateUserResponse } from './response/inactivate-user-response';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserResponse,
  })
  @ApiBody({ type: CreateUserDtoSwager })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ type: [FindUserResponse] })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a user by id' })
  @ApiResponse({ type: FindUserResponse })
  @UseGuards(AuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({ type: UpdateUserResponse })
  @UseGuards(AuthGuard)
  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @ApiOperation({ summary: 'Inactivate a user by id' })
  @ApiResponse({ type: InactivateUserResponse })
  @UseGuards(AuthGuard)
  @Delete(':uuid')
  inactivate(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.inactivate(uuid);
  }
}
