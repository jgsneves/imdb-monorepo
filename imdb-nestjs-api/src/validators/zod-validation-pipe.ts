import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodEffects, ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodEffects<ZodObject<any>> | ZodObject<any>) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}
