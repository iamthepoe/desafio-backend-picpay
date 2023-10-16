import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { UserEntity } from './entities/user.entity';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async create(data: CreateUserDto) {

    if (!['MERCHANT', 'COMMON'].includes(data.userType))
      throw new BadRequestException('O tipo de usuário deve ser MERCHANT ou COMMON');

    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { document: data.document }
        ]
      },
    });

    if (userExists)
      throw new BadRequestException('Email ou CPF já estão sendo utilizados.');

    const user = await this.prisma.user.create({ data });
    return {
      ...user,
      document: undefined,
      password: undefined
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return this.prisma.user.update({ data, where: { id } });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async updateBalanceByTransaction(
    receiver: UserEntity, sender: UserEntity, transaction: TransactionEntity
  ) {
    try {
      await this.update(sender.id, { balance: sender.balance - transaction.amount });
      await this.update(receiver.id, { balance: receiver.balance + transaction.amount });
    } catch {
      throw new InternalServerErrorException('Algo de errado aconteceu no servidor.');
    }
  }

  validateTransaction(sender: UserEntity, amount: number): void {
    if (sender.userType === 'MERCHANT')
      throw new UnauthorizedException('Usuários do tipo Lojista não podem realizar uma transação.');

    if (sender.balance < amount)
      throw new BadRequestException('Saldo insuficiente.');
  }
}
