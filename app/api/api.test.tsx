import "@testing-library/jest-dom";
import axios from 'axios';
import { fetchUsers, fetchPostsByUserId } from "./api";
import { mockUserData, mockPostsData } from '../mockData';


jest.mock("axios");

describe('API Tests', () => {
    it('should fetch user data and posts data using axios', async () => {
        // fetchUsersのaxios.getをモック
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUserData });

        // fetchUsersを呼び出す
        const usersData = await fetchUsers();

        // axios.getが正しいURLで呼び出されたことを期待
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');

        // fetchUsersがモックデータを返すことを期待
        expect(usersData).toEqual(mockUserData);

        // fetchPostsByUserIdのaxios.getをモック
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPostsData });

        // 最初のユーザーのIDでfetchPostsByUserIdを呼び出す
        const postsData = await fetchPostsByUserId(usersData[0].id);

        // axios.getが正しいURLで呼び出されたことを期待
        expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts?userId=${usersData[0].id}`);

        // fetchPostsByUserIdがモックデータを返すことを期待
        expect(postsData).toEqual(mockPostsData);
    });
});
