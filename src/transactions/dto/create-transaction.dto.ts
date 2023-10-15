import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 200.00 })
  @IsDecimal()
  amount: number;

  @ApiProperty()
  @IsUUID()
  senderId: string;

  @ApiProperty()
  @IsUUID()
  receiverId: string;
}
