import { FC } from 'react';
import { Avatar } from '@mantine/core';

type LecturerAvatarProps = {
  firstName: string;
  lastName: string;
};
const InitialsAvatar: FC<LecturerAvatarProps> = ({ firstName, lastName }) => (
  <Avatar color={firstName.endsWith('a') ? 'pink' : 'blue'} radius="xl">
    {firstName.at(0)}
    {lastName.at(0)}
  </Avatar>
);

export { InitialsAvatar };
export type { LecturerAvatarProps };
