import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsService {
  async sendNotification(email: UserEntity['email'], message: string) {
    const notificationRequest = JSON.stringify({ email, message });

    const notificationResponse = await fetch('https://run.mocky.io/v3/ed80a345-dd1b-49b1-83d4-09aa610436ae', {
      method: 'POST',
      body: notificationRequest
    });

    if (notificationResponse.status != 200)
      throw new ServiceUnavailableException('Serviço de notificação indisponível.');
  }
}
