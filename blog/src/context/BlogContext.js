import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return action.payload;

    case "UPDATE":
      return state.map((blogPost) => {
        return blogPost.id == action.payload.id ? action.payload : blogPost;
      });

    case "DELETE":
      return state.filter((blogPost) => blogPost.id !== action.payload);

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "GET", payload: response.data });
  };
};

const addBlogPost = () => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });
    if (callback) callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "DELETE", payload: id });
  };
};

const updateBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({ type: "UPDATE", payload: { id, title, content } });
    if (callback) callback();
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, updateBlogPost, getBlogPosts },
  []
);
