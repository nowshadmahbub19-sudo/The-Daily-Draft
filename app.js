import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "./postModel.js";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const buildPostFromRequest = (body, existingPost = {}) => ({
  ...existingPost,
  title: (body.title ?? "").trim(),
  content: (body.content ?? "").trim(),
  author: (body.author ?? "").trim(),
  category: (body.category ?? "").trim(),
});

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home route
app.get("/", (req, res) => {
  const posts = getAllPosts();
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  const postData = buildPostFromRequest(req.body);
  createPost(postData);
  res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
  const post = getPostById(req.params.id);
  if (!post) {
    return res.status(404).send("Post not found.");
  }

  res.render("edit", { post });
});

app.post("/posts/:id/edit", (req, res) => {
  const post = getPostById(req.params.id);

  if (!post) {
    return res.status(404).send("Post not found.");
  }
  updatePost(req.params.id, buildPostFromRequest(req.body));
  res.redirect("/");
});

app.post("/posts/:id/delete", (req, res) => {
  deletePost(req.params.id);
  res.redirect("/");
});

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

export default app;
