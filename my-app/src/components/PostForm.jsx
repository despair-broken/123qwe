import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({ create }) => {

    const [post, setPost] = useState({ title: '', body: '' });

    const addNewPost = (e) => {
        e.preventDefault();
        if (!post.title.trim() || !post.body.trim()) {
            alert('Заполни оба поля хуйлуша')
            return
        }
        const newPost = {
            ...post, id: uuidv4()
        }
        create(newPost);
        setPost({ title: '', body: '' });
    }

    return (
        <form>
            <MyInput value={post.title} onChange={e => setPost(prevPost => ({ ...prevPost, title: e.target.value }))} type="text" placeholder="Название поста"></MyInput>
            <MyInput value={post.body} onChange={e => setPost(prevPost => ({ ...prevPost, body: e.target.value }))} type="text" placeholder="Описание поста"></MyInput>
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
}

export default React.memo(PostForm);