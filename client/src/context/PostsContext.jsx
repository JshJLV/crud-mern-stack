import { createContext, useState, useEffect } from "react";
import {
  createPostsRequest,
  getPostsRequest,
  deletePostsRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/post";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequest();
    setPosts(res.data);
  };

  const createPosts = async (post) => {
    try {
      const res = await createPostsRequest(post);
      setPosts([...posts, res.data]);
    } catch (error) {
      error;
    }
  };

  const deletePosts = async (id) => {
    const res = await deletePostsRequest(id);

    if (res.status) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data;
  };

  const updatePosts = async (id, post) => {
    const res = await updatePostRequest(id, post);
    setPosts(posts.map((post) => (post._id === id ? res.data : post)));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        getPosts,
        posts,
        createPosts,
        deletePosts,
        getPost,
        updatePosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
