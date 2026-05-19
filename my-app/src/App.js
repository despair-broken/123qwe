import React, { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import { sortArray } from "./utils/sort";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter/PostFilter";

const sortOptions = [
  { value: 'title', name: 'По названию' },
  { value: 'body', name: 'По описанию' },
];

function App() {
  const [posts, setPosts] = useState([
    { id: uuidv4(), title: 'Хуита 1', body: 'Неважная Хуита 1' },
    { id: uuidv4(), title: 'Хуита 2', body: 'Неважная Хуита 2' },
    { id: uuidv4(), title: 'Хуита 3', body: 'Неважная Хуита 3' },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });

  const removePost = useCallback((id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  }, [])

  const handleCreatePost = useCallback((newPost) => {
    setPosts(prev => [...prev, newPost]);
  }, []);

  const sortedPosts = useMemo(() => {
    if (!filter.sort) return posts;
    return sortArray(posts, filter.sort);
  }, [posts, filter.sort]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(p => p.title.toLowerCase().includes(filter.query.toLowerCase()));
  }, [filter.query, sortedPosts]);

  return (
    <div className="App">
      <PostForm
        create={handleCreatePost}
      />
      <hr className="separator" />
      <PostFilter
        sortOptions={sortOptions}
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} title='Список неважной Хуиты' posts={sortedAndSearchedPosts} />
    </div>
  )
}

export default App