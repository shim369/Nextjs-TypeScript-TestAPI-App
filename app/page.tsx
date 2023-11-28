"use client"
import styles from './page.module.css'
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CombinedData extends Post {
  user?: User;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    };

    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchPosts();
    fetchUsers();
  }, []);

  useEffect(() => {
    const combined = posts.map(post => {
      const user = users.find(user => user.id === post.userId);
      return { ...post, user };
    });
    setCombinedData(combined);
  }, [posts, users]);

  return (
    <div>
      <h1>Post Data</h1>
      <ul className={styles.ul}>
        {combinedData.map(item => (
          <li key={item.id} className={styles.li}>
            <p><strong>{item.title}</strong></p>
            <p>by {item.user ? item.user.name : 'Unknown User'}</p>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
