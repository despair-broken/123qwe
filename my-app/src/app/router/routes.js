import HomePage from '../../pages/home/HomePage';
import PostsPage from '../../pages/posts/PostsPage';
import PostDetailsPage from '../../pages/post-details/PostDetailsPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';

export const routes = [
    {
        path: '/',
        element: HomePage,
    },
    {
        path: '/posts',
        element: PostsPage,
    },
    {
        path: '/posts/:id',
        element: PostDetailsPage,
    },
    {
        path: '*',
        element: NotFoundPage,
    }
]