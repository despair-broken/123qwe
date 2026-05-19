import React, { useCallback, useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import { sortArray } from "./utils/sort";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter/PostFilter";
import MyModal from "./components/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";

const sortOptions = [
  { value: 'title', name: 'По названию' },
  { value: 'body', name: 'По описанию' },
];

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data);
  }

  const removePost = useCallback((id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  }, [])

  const handleCreatePost = useCallback((newPost) => {
    setPosts(prev => [...prev, newPost]);
  }, []);

  return (
    <div className="App">
      <MyButton className="open-modal-btn" onClick={() => setModal(true)}>Если тебе грустно, нажми</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <h1 className="post__list__title">Ты хуесос</h1>
      </MyModal>
      <PostForm
        create={handleCreatePost}
      />
      <hr className="separator" />
      <PostFilter
        sortOptions={sortOptions}
        filter={filter}
        setFilter={setFilter}
      />
      <PostList className="post-delete-btn" remove={removePost} title='Список какой-то хуйни' posts={sortedAndSearchedPosts} />
    </div>
  )
}

export default App