import axios from 'axios';
import { User, Post } from '../types';

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function fetchPostsByUserId(userId: number): Promise<Post[]> {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for userId ${userId}:`, error);
    throw error;
  }
}