import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from '../database/prisma.service';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService],
  imports: [UsersModule, NotificationsModule]
})
export class TransactionsModule { }
