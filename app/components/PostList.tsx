import styles from '../page.module.css';
import { Post } from '../types';

interface PostListProps {
    userPosts: Post[];
}

export const PostList = ({ userPosts }: PostListProps) => {
    return(
        <ul className={styles.postList}>
        {userPosts.map((post) => (
            <li key={post.id}>
            <p><strong>{post.title}</strong></p>
            <p>{post.body}</p>
            </li>
        ))}
        </ul>
    );
};