import { User, Post } from '../types';

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
}
  
export async function fetchPostsByUserId(userId: number): Promise<Post[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.json();
}