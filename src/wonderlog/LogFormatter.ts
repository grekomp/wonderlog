import { LogEntry } from "./Wonder";
import { WonderOptions } from "./WonderOptions";

export class LogFormatter {
  filter: (entry: LogEntry, parent: WonderOptions) => boolean;
  format: (entry: LogEntry, parent: WonderOptions) => WonderOptions;
  priority?: number;

  constructor(
    filter: (entry: LogEntry, parent: WonderOptions) => boolean,
    formatter: (entry: LogEntry, parent: WonderOptions) => WonderOptions,
    priority: number = 0
  ) {
    this.filter = filter;
    this.format = formatter;
    this.priority = priority;
  }
}
