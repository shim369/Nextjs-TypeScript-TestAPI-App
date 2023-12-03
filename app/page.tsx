"use client"
import styles from './page.module.css'
import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchPostsByUserId } from './api/api';
import { User, Post } from './types';
import Link from 'next/link';
import { UserList } from './components/UserList';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [selectedUserEmail, setselectedUserEmail] = useState<string | null>(null);
  const [selectedUserWebsite, setselectedUserWebsite] = useState<string | null>(null);

  const formattedWebsite = selectedUserWebsite && selectedUserWebsite.startsWith('http') ? selectedUserWebsite : `http://${selectedUserWebsite}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMaskClick = () => {
    handleCloseModal();
  };

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
        setselectedUserEmail(user.email);
        setselectedUserWebsite(user.website);
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
          <UserList users={users} handleUserClick={handleUserClick} />
        </div>

      {selectedUserId && (
        <div className={styles.rightBox}>
          <h2>Posts by <span id="open" onClick={handleOpenModal}>{selectedUserName}</span></h2>
          {isModalOpen && (
           <>
          <div id="modal" className={styles.hidden}>
            <h2>User Info</h2>
            <p>Name : {selectedUserName}</p>
            <p>Email : {selectedUserEmail}</p>
            <p>Website : {selectedUserWebsite && <Link href={formattedWebsite} target="_blank" rel="noopener noreferrer">{selectedUserWebsite}</Link>}</p>
            <div id="close" onClick={handleCloseModal}>
                close
            </div>
          </div>
          </>
          )}
          {isModalOpen && <div id="mask" className={styles.hidden} onClick={handleMaskClick}></div>}
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