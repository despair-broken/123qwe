import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = ({ post, number, remove, className }) => {
    return (
        <div className="post">
            <div className="post__content">
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div classNaeme="post__btns">
                <MyButton className={className} onClick={() => remove(post.id)}>Удалить хуйню</MyButton>
            </div>
        </div>
    );
};

export default React.memo(PostItem)