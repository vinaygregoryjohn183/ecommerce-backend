import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  productIds: string[];
}
