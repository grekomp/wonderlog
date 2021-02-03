import { LogFormatter } from "./LogFormatter";
import { LogStyle } from "./LogStyle";
import { LogEntry, Wonder } from "./Wonder";

export type WonderOptions = {
  style: LogStyle;
  content: LogEntry[];
  prefixValue?: WonderOptions;
  postfixValue?: WonderOptions;
  defaultTrailingSeparator: string;
  trailingSeparator?: string;
  formatters: LogFormatter[];
};
