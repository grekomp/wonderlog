import { LogFormatter } from "./LogFormatter.js";
import { LogStyle } from "./LogStyle.js";
import { LogEntry } from "./Wonder.js";
import { WonderOptions } from "./WonderOptions.js";
import WonderOptionsHelper from "./WonderOptionsHelper.js";

export class NumberLogFormatter extends LogFormatter {
  numberFormat: Intl.NumberFormat;

  constructor(
    filter?: (entry: LogEntry, parent: WonderOptions) => boolean,
    formatter?: (entry: LogEntry, parent: WonderOptions) => WonderOptions,
    priority: number = 0,
    numberFormat?: Intl.NumberFormat,
    style?: LogStyle
  ) {
    super(
      filter || ((entry) => typeof entry === "number"),
      formatter ||
        ((entry, parent) =>
          WonderOptionsHelper.create(undefined, {
            content: [this.numberFormat.format(entry)],
            style: style || {
              color: "#9980FF",
            },
          })),
      priority
    );
    this.numberFormat = numberFormat || new Intl.NumberFormat();

    this.filter = this.filter.bind(this);
    this.format = this.format.bind(this);
  }
}
