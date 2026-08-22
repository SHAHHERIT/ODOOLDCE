import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "data", "db.json");

function readRaw() {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(
      `Database file not found at ${DB_PATH}. Run "npm run seed" first.`
    );
  }
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeRaw(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// Extremely small synchronous "database". Fine for a hackathon project /
// single-process dev server. Every call re-reads the file so the JSON
// file itself stays the single source of truth (easy to inspect/reset).
const db = {
  read: readRaw,
  write: writeRaw,

  get(collection) {
    const data = readRaw();
    return data[collection] || [];
  },

  set(collection, records) {
    const data = readRaw();
    data[collection] = records;
    writeRaw(data);
    return records;
  },

  find(collection, predicate) {
    return this.get(collection).find(predicate);
  },

  filter(collection, predicate) {
    return this.get(collection).filter(predicate);
  },

  insert(collection, record) {
    const data = readRaw();
    data[collection] = data[collection] || [];
    data[collection].push(record);
    writeRaw(data);
    return record;
  },

  update(collection, predicate, updater) {
    const data = readRaw();
    const list = data[collection] || [];
    const index = list.findIndex(predicate);
    if (index === -1) return null;
    list[index] = updater(list[index]);
    data[collection] = list;
    writeRaw(data);
    return list[index];
  },

  remove(collection, predicate) {
    const data = readRaw();
    const list = data[collection] || [];
    const index = list.findIndex(predicate);
    if (index === -1) return false;
    list.splice(index, 1);
    data[collection] = list;
    writeRaw(data);
    return true;
  },
};

export default db;
