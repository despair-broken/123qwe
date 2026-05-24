import { apiClient } from "./client";

export const PostsApi = {
    async getPosts(limit = 10, page = 1) {
        const response = await apiClient.get("/posts", {
            params: {
                _limit: limit,
                _page: page,
            },
        });
        return response.data;
    },
    async getPostById(id) {
        const response = await apiClient.get(`/posts/${id}`);
        return response.data;
    }
};