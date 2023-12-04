import { render } from '@testing-library/react';
import { PostList } from './PostList';
import { Post } from '../types';
import { mockPostsData } from '../mockData';

test('PostList renders correctly', () => {
  const { getByText } = render(<PostList userPosts={mockPostsData as Post[]} />);

  // ダミーデータの投稿が表示されているか確認
  mockPostsData.forEach((post) => {
    // 期待するテキストが表示されているかどうかを確認
    expect(getByText(post.title)).toBeTruthy();
    expect(getByText(new RegExp(post.body.replace(/\n/g, '\\s*')))).toBeTruthy();
  });
});
