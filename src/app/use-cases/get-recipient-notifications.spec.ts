import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { GetRecipientsNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientsNotifications(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient1' }),
        expect.objectContaining({ recipientId: 'recipient1' }),
      ]),
    );
  });
});
