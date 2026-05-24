import { useMemo } from "react";
import { sortArray } from "../utils/sort";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (!sort) return posts;
        return sortArray(posts, sort);
    }, [posts, sort])
    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts])
    return sortedAndSearchedPosts;
}