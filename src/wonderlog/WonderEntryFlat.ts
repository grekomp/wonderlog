import { LogStyle } from "./LogStyle.js";
import { LogEntry } from "./Wonder.js";

export type WonderEntryFlat = {
  content: LogEntry;
  style: LogStyle;
  trailingSeparator: string;
};

export type LogEntryFlat = WonderEntryFlat | any;
