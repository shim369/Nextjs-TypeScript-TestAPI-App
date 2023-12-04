import { render, fireEvent } from '@testing-library/react';
import { UserList } from './UserList';
import { User } from '../types';
import { mockUserData } from '../mockData';

const mockHandleUserClick = jest.fn();

test('UserList renders correctly', () => {
  const { getByText } = render(
    <UserList users={mockUserData as User[]} handleUserClick={mockHandleUserClick} />
  );

  // ダミーデータのユーザー名が表示されているか確認
  mockUserData.forEach((user) => {
    expect(getByText(user.name)).toBeTruthy();
  });

  // ユーザーをクリックしたときにハンドラーが呼ばれるか確認
  fireEvent.click(getByText(mockUserData[0].name));
  expect(mockHandleUserClick).toHaveBeenCalledWith(mockUserData[0].id);
});