import styles from '../page.module.css';
import { User } from '../types';

interface UserListProps {
  users: User[];
  handleUserClick: (userId: number) => void;
}

export const UserList = ({ users, handleUserClick }: UserListProps) => {
  return (
    <ul className={styles.userList}>
      {users.map((user) => (
        <li key={user.id} onClick={() => handleUserClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
};