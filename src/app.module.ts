import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [UsersModule, TransactionsModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
