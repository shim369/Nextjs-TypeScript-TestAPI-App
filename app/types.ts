export interface User {
    id: number;
    name: string;
    email: string;
    website: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}