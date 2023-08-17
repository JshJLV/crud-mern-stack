import { PostsContext } from "../context/PostsContext";
import { useContext } from "react";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

function HomePage() {
  const { posts } = useContext(PostsContext);

  if (posts.lenght === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-white text-2xl">No hay publicaciones</h1>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between py-4">
        <h1 className="text-2xl text-gray-300 font-bold">
          Post ({posts.length})
        </h1>
        <Link
          to={"/new"}
          className="bg-green-800 hover:bg-green-600 rounded text-white px-4 py-2"
        >
          Create new post
        </Link>
      </header>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
