import RushDB from '@rushdb/javascript-sdk';
import dotenv from 'dotenv';

dotenv.config();

if(!process.env.RUSHDB_API_KEY){
    throw new Error("RUSHDB_API_KEY is missing in .env");
}

const db = new RushDB(process.env.RUSHDB_API_KEY);

export default db;