import { LogStyle } from "./LogStyle";
import { LogEntry } from "./Wonder";

export type WonderEntryFlat = {
  content: LogEntry;
  style: LogStyle;
  trailingSeparator: string;
};

export type LogEntryFlat = WonderEntryFlat | any;
