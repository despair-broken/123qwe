import React from "react";
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PostList = ({ title, posts, remove }) => {
    if (!posts.length) {
        return (
            <h1 className="post__list__title">
                Посты не найдены!
            </h1>
        )
    }
    return (
        <div>
            <h1 className="post__list__title">
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) => {
                    const nodeRef = React.createRef();
                    return (
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames="post"
                            nodeRef={nodeRef}
                            unmountOnExit
                        >
                            <div ref={nodeRef}>
                                <PostItem
                                    remove={remove}
                                    number={index + 1}
                                    post={post}
                                />
                            </div>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </div>
    );
};

export default React.memo(PostList)