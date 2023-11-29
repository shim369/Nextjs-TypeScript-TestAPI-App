"use client"
import styles from './page.module.css'
import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchPostsByUserId } from './api/api';
import { User, Post } from './types';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData: User[] = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = async (userId: number) => {
    try {
      const user = users.find((user) => user.id === userId);
      if (user) {
        setSelectedUserName(user.name);
        setSelectedUserId(userId);

        const postsData: Post[] = await fetchPostsByUserId(userId);
        setUserPosts(postsData);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  return (
    <div>
      <h1>User & Post List from API</h1>
      <div className={styles.flexBox}>
        <div className={styles.leftBox}>
          <h2>Select user</h2>
          <ul className={styles.userList}>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user.id)}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>

      {selectedUserId && (
        <div className={styles.rightBox}>
        <h2>Posts by <span>{selectedUserName}</span></h2>
          <ul className={styles.postList}>
            {userPosts.map((post) => (
              <li key={post.id}>
                <p><strong>{post.title}</strong><br />{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};