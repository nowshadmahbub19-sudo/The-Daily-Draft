import db from "./db.js";

const getAllpostsStmt=db.prepare(`
    SELECT id, title,content, author, category,
    created_at
    FROM posts
    ORDER BY id DESC
    
    `);

const getPostByIdStmt=db.prepare(
    `SELECT id, title, content, author ,category,
    created_at
    FROM posts
    WHERE ID =?`
);

const createPostStmt=db.prepare(`
    INSERT INTO posts (title,content, author,
    category)
    VALUES(?,?,?,?)   
    `
);

const updatePostStmt= db.prepare(
    `    UPDATE posts
    SET title = ?, content=? ,author =?,category=?
    WHERE id=?
`
    
);


const deletePostStmt=db.prepare(`
    DELETE FROM posts
    WHERE id=?`);


export function getAllPosts() {
  return getAllpostsStmt.all();
}

export function getPostById(id) {
  return getPostByIdStmt.get(id);
}

export function createPost({ title, content, author, category }) {
  return createPostStmt.run(title, content, author, category);
}

export function updatePost(id, { title, content, author, category }) {
  return updatePostStmt.run(title, content, author, category, id);
}

export function deletePost(id) {
  return deletePostStmt.run(id);
}
