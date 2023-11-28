export async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}
  
export async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
}
  