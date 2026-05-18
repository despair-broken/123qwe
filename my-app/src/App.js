import React, { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import { sortArray } from "./utils/sort";

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

  const [selectedSort, setSelectedSort] = useState('');

  const removePost = useCallback((id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  }, [])

  const handleCreatePost = useCallback((newPost) => {
    setPosts(prev => [...prev, newPost]);
  }, []);

  const sortedPosts = useMemo(() => {
    if (!selectedSort) return posts;
    return sortArray(posts, selectedSort);
  }, [posts, selectedSort]);

  return (
    <div className="App">
      <PostForm
        create={handleCreatePost}
      />
      <hr className="separator" />
      <div>
        <MySelect
          value={selectedSort}
          onChange={setSelectedSort}
          defaultValue="Сортировка"
          options={sortOptions}
        />
      </div>
      {sortedPosts.length > 0
        ? <PostList remove={removePost} title='Список неважной Хуиты' posts={sortedPosts} />
        : <h1 className="post__list__title">Посты не найдены!</h1>
      }
    </div>
  )
}

export default App