import { render, screen } from '@testing-library/react';
import { mockUserData } from '../mockData';
import { Modal } from './Modal';
import { User } from '../types';

test('Modal component renders user data correctly', () => {
  const user: User = mockUserData[0];

  render(
    <Modal
      selectedUserName={user.name}
      selectedUserEmail={user.email}
      selectedUserWebsite={user.website}
      formattedWebsite={user.website}
      onClose={() => {}}
    />
  );

  expect(screen.getByText(`Name : ${user.name}`)).toBeTruthy();
  expect(screen.getByText(`Email : ${user.email}`)).toBeTruthy();

  const websiteLink = screen.getByText(user.website) as HTMLAnchorElement | null;
  expect(websiteLink).not.toBeNull();

  const normalizedReceived = websiteLink?.href.replace('http://localhost/', '');
  expect(normalizedReceived).toBe(user.website);
});
