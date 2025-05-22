"use server-only";
import {
  bigint,
  text,
  index,
  singlestoreTableCreator,
  int,
} from "drizzle-orm/singlestore-core";

export const createTables = singlestoreTableCreator(
  (name) => `gdrive-cln.${name}`,
);

export const files = createTables(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export const folders = createTables(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);
