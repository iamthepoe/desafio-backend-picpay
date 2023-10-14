import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  create(data: CreateUserDto) {
    //return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findFirstOrThrow({ where: { id } });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({ data, where: { id } });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  private validateTransaction(sender: UserEntity, amount: number): void {
    if (sender.userType === 'MERCHANT')
      throw new UnauthorizedException('Usuários do tipo Lojista não podem realizar uma transação.');


    if ((sender.balance - amount) < 0)
      throw new UnauthorizedException('Saldo insuficiente.');
  }
}
