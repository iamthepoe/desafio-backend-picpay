import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsNumber } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Noel" })
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Rosa" })
  @IsString()
  lastName: string;

  @ApiProperty({ example: "noel@rosa.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "algumasenha" })
  @Length(10)
  password: string;

  @ApiProperty({ example: "MERCHANT" })
  userType: string;

  @ApiProperty({ example: "73758244528" })
  document: string;

  @ApiProperty({ example: 200.50 })
  @IsNumber()
  balance: number;
}
