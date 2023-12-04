"use client"
import styles from './page.module.css'
import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchPostsByUserId } from './api/api';
import { User, Post } from './types';
import { UserList } from './components/UserList';
import { PostList } from './components/PostList';
import { Modal } from './components/Modal';
import { Mask } from './components/Mask';

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
          {isModalOpen && <Modal
            selectedUserName={selectedUserName || ""}
            selectedUserEmail={selectedUserEmail || ""}
            selectedUserWebsite={selectedUserWebsite || ""}
            formattedWebsite={formattedWebsite}
            onClose={handleCloseModal}
          />}
          {isModalOpen && <Mask onClick={handleMaskClick} />}
          <PostList userPosts={userPosts} />
        </div>
      )}
      </div>
    </div>
  );
};