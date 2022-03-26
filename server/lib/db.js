import { join } from 'path';
// eslint-disable-next-line
import { Low, JSONFile } from 'lowdb';

// Use JSON file for storage
const file = join(process.env.PWD, './data/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.read();

export default db;
