import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsService {
  async sendNotification(email: UserEntity['email'], message: string) {
    const notificationRequest = JSON.stringify({ email, message });

    const notificationResponse = await fetch('http://o4d9z.mocklab.io/notify', {
      method: 'POST',
      body: notificationRequest
    });

    if (notificationResponse.status != 200)
      throw new ServiceUnavailableException('Serviço de notificação indisponível.');
  }
}
