import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../database/prisma.service';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly notificationService: NotificationsService
  ) { }

  async create(data: CreateTransactionDto) {
    const sender = await this.userService.findOne(data.senderId);
    const receiver = await this.userService.findOne(data.receiverId);

    if (sender.id === receiver.id)
      throw new BadRequestException('Não é permitido fazer uma transação para si mesmo.');

    this.userService.validateTransaction(sender, data.amount);

    const isAuthorized = await this.authorizeTransaction();
    if (!isAuthorized) throw new UnauthorizedException('Transação não autorizada.')

    const transaction = await this.prisma.transaction.create({ data });
    await this.userService.updateBalanceByTransaction(receiver, sender, transaction);
    await this.notificationService.sendNotification(receiver.email, "Pagamento recebido!");

    return transaction;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async authorizeTransaction() {
    const response = await fetch('https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc');
    const data = await response.json();

    return response.status === 200 && data.message === 'Autorizado';
  }
}
