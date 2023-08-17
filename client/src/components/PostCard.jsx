import toast from "react-hot-toast";
import { PostsContext } from "../context/PostsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const { deletePosts } = useContext(PostsContext);
  const navigate = useNavigate();

  const handleDelete = (_id) => {
    toast(
      (t) => (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-white">Do you want to delete?</p>
          <div className="flex justify-center items-center">
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white"
              onClick={() => {
                deletePosts(_id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-700 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer">
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3>{post.title}</h3>
          <div className="flex gap-2">
            <button
              className="bg-cyan-600 text-sm px-2 py-1 rounded-sm"
              onClick={() => navigate(`/posts/${post._id}`)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-sm px-2 py-1 rounded-sm"
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
        <p>{post.description}</p>
        {post.image ? <img src={post.image.url} /> : ""}
      </div>
    </div>
  );
}

export default PostCard;
