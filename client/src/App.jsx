import HomePage from "./pages/HomePage";
import PostForm from "./pages/PostForm";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-neutral-600 min-h-screen flex items-center">
      <div className="container px-10 mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
