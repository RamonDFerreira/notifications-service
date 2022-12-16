import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { CountRecipientsNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to Count recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientsNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient1',
    });

    expect(count).toEqual(2);
  });
});
