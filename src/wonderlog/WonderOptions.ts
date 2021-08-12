import { LogFormatter } from "./LogFormatter.js";
import { LogStyle } from "./LogStyle.js";
import { LogEntry } from "./Wonder.js";

export type WonderOptions = {
  style?: LogStyle;
  content?: LogEntry[];
  prefixValue?: WonderOptions;
  postfixValue?: WonderOptions;
  prefixSeparator?: string;
  innerSeparator?: string;
  postfixSeparator?: string;
  formatters?: LogFormatter[];
};
