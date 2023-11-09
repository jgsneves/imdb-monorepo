import { ApiProperty } from '@nestjs/swagger';

export class VotesAverageResponse {
  @ApiProperty()
  average: number;
}
