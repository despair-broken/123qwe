import React from "react";
import PostItem from "./PostItem";

const PostList = ({ title, posts, remove }) => {
    if (!posts.length) {
        return (
            <h1 className="post__list__title">Посты не найдены!</h1>
        )
    }
    return (
        <div>
            <h1 className="post__list__title">{title}</h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
            )}
        </div>
    );
};

export default React.memo(PostList)