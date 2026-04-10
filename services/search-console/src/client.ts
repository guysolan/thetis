import { google } from "googleapis";
import type { AuthMode } from "./auth.js";
import { getGoogleAuth } from "./auth.js";

export function getSearchConsole(mode: AuthMode) {
  const auth = getGoogleAuth(mode);
  return google.searchconsole({ version: "v1", auth });
}
