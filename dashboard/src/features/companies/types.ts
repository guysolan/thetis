import { Database } from "@/database.types";

export type Company = Database["public"]["Tables"]["companies"];
export type CompanyRow = Company["Row"];
