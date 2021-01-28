import { LogEntry, Wonder } from "./Wonder";
import { WonderImplementation } from "./WonderImplementation";

export class LogFormatter {
  filter: (entry: LogEntry, parent: WonderImplementation) => boolean;
  format: (entry: LogEntry, parent: WonderImplementation) => Wonder;
  priority?: number;

  constructor(
    filter: (entry: LogEntry, parent: WonderImplementation) => boolean,
    formatter: (entry: LogEntry, parent: WonderImplementation) => Wonder,
    priority: number = 0
  ) {
    this.filter = filter;
    this.format = formatter;
    this.priority = priority;
  }
}
