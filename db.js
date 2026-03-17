import Database from "better-sqlite3";
import path from "path";

import { fileURLToPath } from "url";

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const dbPath=path.join(__dirname,"data","blog.db");

const db=new Database(dbPath);

db.pragma("journal_mode=WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS posts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`);

export default db;
