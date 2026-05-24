/** @format */

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles/App.css";
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
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount } from "./utils/pages";
import { getPagesArray } from "./utils/pages";

const sortOptions = [
  { value: "title", name: "По названию" },
  { value: "body", name: "По описанию" },
];

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const removePost = useCallback((id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleCreatePost = useCallback((newPost) => {
    setPosts((prev) => [...prev, newPost]);
  }, []);

  return (
    <div className="App">
      <MyButton className="open-modal-btn" onClick={() => setModal(true)}>
        Если тебе грустно, нажми
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <h1 className="post__list__title">Ты хуесос</h1>
      </MyModal>
      <PostForm create={handleCreatePost} />
      <hr className="separator" />
      <PostFilter
        sortOptions={sortOptions}
        filter={filter}
        setFilter={setFilter}
      />
      {postError && (
        <h1 className="post__list__title">Произошла ошибка {postError}</h1>
      )}
      {isPostsLoading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        <PostList
          className="post-delete-btn"
          remove={removePost}
          title="Список какой-то хуйни"
          posts={sortedAndSearchedPosts}
        />
      )}
      <div className="pagination-wrapper">
        {pagesArray.map((p) => (
          <MyButton
            onClick={() => setPage(p)}
            key={p}
            className={
              page === p
                ? "pagination__item pagination__item--active"
                : "pagination__item"
            }
          >
            {p}
          </MyButton>
        ))}
      </div>
    </div>
  );
}

export default App;
