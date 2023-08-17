import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PostsContext } from "../context/PostsContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function PostForm() {
  const { createPosts, getPost, updatePosts } = useContext(PostsContext);
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchingData = async () => {
      if (params.id) {
        const data = await getPost(params.id);
        setPost(data);
      }
    };
    fetchingData();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">new post</h3>
          <Link to={"/"} className="text-gray-400 hover:text-gray-300">
            Go back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("El titulo es requerido"),
            description: Yup.string().required("La descripcion es requrida"),
          })}
          onSubmit={async (values, actions) => {
            params.id
              ? await updatePosts(params.id, values)
              : await createPosts(values);
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Title
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                name="title"
                placeholder="title"
              />
              <ErrorMessage
                component="p"
                className="text-red-600 text-sm"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400 mt-4"
              >
                Description
              </label>
              <Field
                component="textarea"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                name="description"
                placeholder="description"
                rows="3"
              />
              <ErrorMessage
                component="p"
                className="text-red-600 text-sm"
                name="description"
              />
              <label className="text-sm block font-bold text-gray-400 mt-4"></label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <button
                className="bg-green-800 hover:bg-green-600 px-4 py-2 rounded w-full mt-2 text-white focus:outline-none disabled:bg-green-400 text-center"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PostForm;
