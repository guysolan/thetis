import { Database } from "@/database.types";

export type Contact = Database["public"]["Tables"]["contacts"];
export type ContactRow = Contact["Row"];
