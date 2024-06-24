import { notifications } from '@mantine/notifications';

type ShowNotificationParams = {
  color: 'blue' | 'green' | 'red';
  title: string;
  message: string;
};

const showNotification = ({ color, title, message }: ShowNotificationParams) => {
  notifications.show({
    title,
    message,
    color,
    radius: 'xs',
    withBorder: true,
    withCloseButton: true,
    style: {
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 30px 0px',
    },
  });
};

export { showNotification };
export type { ShowNotificationParams };
