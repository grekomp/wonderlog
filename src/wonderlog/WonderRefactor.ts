import { LogEntry } from "./Wonder";
import { WonderOptions } from "./WonderOptions";

type WonderRefactor = {
  options: WonderOptions;
  toString: () => string;
  log: (...entries: LogEntry[]) => void;
  debug: (...entries: LogEntry[]) => void;
  warn: (...entries: LogEntry[]) => void;
  error: (...entries: LogEntry[]) => void;
  group: (...entries: LogEntry[]) => void;
  groupCollapsed: (...entries: LogEntry[]) => void;
  groupEnd: () => void;
};
