import axios from "axios";

const url = "http://localhost:3000/posts";

export const getPostsRequest = async () => {
  return await axios.get(url);
};

export const createPostsRequest = async (post) => {
  const form = new FormData();

  for (let key in post) {
    form.append(key, post[key]);
  }

  return await axios.post(url, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePostsRequest = async (id) => {
  return await axios.delete(`${url}/${id}`);
};

export const getPostRequest = async (id) => {
  return await axios.get(`${url}/${id}`);
};

export const updatePostRequest = async (id, post) => {
  return await axios.put(`${url}/${id}`, post);
};
