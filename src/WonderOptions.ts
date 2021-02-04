import { LogFormatter } from "./LogFormatter";
import { LogStyle } from "./LogStyle";
import { LogEntry, Wonder } from "./Wonder";

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
