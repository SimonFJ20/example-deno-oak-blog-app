import { MemoryDB } from "./database/MemoryDB.ts";
import { runWebServer } from "./web/server.ts";

const db = new MemoryDB();
await runWebServer(db);

