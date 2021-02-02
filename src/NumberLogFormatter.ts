import LogStyle from "./LogStyle";
import WonderHelper from "./WonderHelper";
import { LogEntry, Wonder } from "./Wonder";
import { WonderImplementation } from "./WonderImplementation";
import { LogFormatter } from "./LogFormatter";

export class NumberLogFormatter extends LogFormatter {
  numberFormat: Intl.NumberFormat;

  constructor(
    filter?: (entry: LogEntry, parent: WonderImplementation) => boolean,
    formatter?: (entry: LogEntry, parent: WonderImplementation) => Wonder,
    priority: number = 0,
    numberFormat?: Intl.NumberFormat,
    style?: LogStyle
  ) {
    super(
      filter || ((entry) => typeof entry === "number"),
      formatter ||
        ((entry, parent) =>
          WonderHelper.create(undefined, {
            content: [this.numberFormat.format(entry)],
            style: style || {
              color: "#9980FF",
            },
            trailingSeparator: parent.options.trailingSeparator,
          })),
      priority
    );
    this.numberFormat = numberFormat || new Intl.NumberFormat();

    this.filter = this.filter.bind(this);
    this.format = this.format.bind(this);
  }
}
