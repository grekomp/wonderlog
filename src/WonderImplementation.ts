// tslint:disable: no-console
import { LogFormatter } from "./LogFormatter";
import { NumberLogFormatter } from "./NumberLogFormatter";
import { LogStyle } from "./LogStyle";
import WonderHelper from "./WonderHelper";
import { LogEntry, Wonder } from "./Wonder";
import { WonderOptions } from "./WonderOptions";
import WonderOptionsHelper from "./WonderOptionsHelper";

export default class WonderImplementation {
  options: WonderOptions;

  constructor(options?: WonderOptions) {
    this.options = Object.assign(WonderOptionsHelper.default(), options);
  }

  toString(): string {
    return "Wonder [" + JSON.stringify(this.options) + "]";
  }

  //#region Logging methods
  log(...entries: LogEntry[]) {
    console.log(...WonderHelper.GenerateLogElements(this, entries));
  }
  debug(...entries: LogEntry[]): void {
    console.debug(...WonderHelper.GenerateLogElements(this, entries));
  }
  warn(...entries: LogEntry[]): void {
    console.warn(...WonderHelper.GenerateLogElements(this, entries));
  }
  error(...entries: LogEntry[]): void {
    console.error(...WonderHelper.GenerateLogElements(this, entries));
  }
  group(...entries: LogEntry[]): void {
    console.group(...WonderHelper.GenerateLogElements(this, entries));
  }
  groupCollapsed(...entries: LogEntry[]): void {
    console.groupCollapsed(...WonderHelper.GenerateLogElements(this, entries));
  }
  groupEnd(): void {
    console.groupEnd();
  }

  //#endregion Logging methods
  //#region Setting content
  _apply(content: LogEntry[]): Wonder {
    return WonderHelper.create(this, { content });
  }

  pre(prefix: LogEntry): Wonder {
    throw new Error("Method not implemented.");
  }
  post(postfix: LogEntry): Wonder {
    throw new Error("Method not implemented.");
  }

  separator(separatorString: string): Wonder {
    return WonderHelper.create(this, {
      innerSeparator: separatorString,
    });
  }
  get noSeparator(): Wonder {
    return this.separator("");
  }
  //#endregion Setting content
  //#region Setting styles
  color(color: string): Wonder {
    return WonderHelper.create(this, {
      style: { color },
    });
  }
  get red(): Wonder {
    return this.color("red");
  }
  get blue(): Wonder {
    return this.color("blue");
  }
  get black(): Wonder {
    return this.color("black");
  }
  get white(): Wonder {
    return this.color("white");
  }
  get purple(): Wonder {
    return this.color("MediumPurple");
  }

  bg(bgColor: string): Wonder {
    return WonderHelper.create(this, {
      style: { background: bgColor },
    });
  }
  get bgBlack(): Wonder {
    return this.bg("black");
  }
  get bgRed(): Wonder {
    return this.bg("red");
  }

  fontWeight(fontWeight?: string): Wonder {
    return WonderHelper.create(this, {
      style: { font_weight: fontWeight },
    });
  }
  get bold(): Wonder {
    return this.fontWeight("bold");
  }

  fontStyle(fontStyle?: string): Wonder {
    return WonderHelper.create(this, {
      style: { font_style: fontStyle },
    });
  }
  get italic(): Wonder {
    return this.fontStyle("italic");
  }

  padding(padding?: string): Wonder {
    return WonderHelper.create(this, {
      style: { padding },
    });
  }
  border(border?: string): Wonder {
    return WonderHelper.create(this, {
      style: { border },
    });
  }
  borderRadius(borderRadius?: string): Wonder {
    return WonderHelper.create(this, {
      style: { border_radius: borderRadius },
    });
  }
  //#endregion Setting styles
  //#region Style combinations
  get tag(): Wonder {
    return WonderHelper.create(this, {
      style: {
        padding: "0 4px",
        border: "1px solid #666",
        border_radius: "2px",
        background: "rgba(0,0,0,0.8)",
      },
    });
  }
  get dangerTag(): Wonder {
    return WonderHelper.create(this, {
      style: {
        padding: "0 4px",
        border_radius: "2px",
        background: "hsl(348, 100%, 61%)",
        color: "white",
      },
    });
  }
  get successTag(): Wonder {
    return WonderHelper.create(this, {
      style: {
        padding: "0 4px",
        border_radius: "2px",
        background: "hsl(141, 71%, 48%)",
      },
    });
  }
  get warningTag(): Wonder {
    return WonderHelper.create(this, {
      style: {
        padding: "0 4px",
        border_radius: "2px",
        background: "hsl(48, 100%, 67%)",
        color: "rgba(0,0,0,.7)",
      },
    });
  }
  //#endregion Style combinations
  //#region Formatters
  /**
   * Adds new formatters to the wonder instance
   * @param formatters Formatters to be added to the wonder instance
   */
  format(...formatters: LogFormatter[]): Wonder {
    return WonderHelper.create(this, {
      formatters: this.options.formatters
        ? [...this.options.formatters, ...formatters]
        : formatters,
    });
  }
  get formatStringAsLiteral(): Wonder {
    return this.format(
      new LogFormatter(
        (entry) => typeof entry === "string",
        (entry) => {
          return WonderOptionsHelper.create(undefined, {
            content: [entry],
            style: {
              color: "#F28B54",
            },
            prefixValue: WonderOptionsHelper.create(undefined, {
              content: ['"'],
            }),
            postfixValue: WonderOptionsHelper.create(undefined, {
              content: ['"'],
            }),
          });
        }
      )
    );
  }
  get formatNumberAsLiteral(): Wonder {
    return this.format(
      new NumberLogFormatter(
        undefined,
        undefined,
        undefined,
        new Intl.NumberFormat("en-US")
      )
    );
  }
  formatNumberAs(numberFormat: Intl.NumberFormat, style?: LogStyle): Wonder {
    return this.format(
      new NumberLogFormatter(
        undefined,
        undefined,
        undefined,
        numberFormat,
        style
      )
    );
  }
  get formatObjectAsJson(): Wonder {
    return this.format(
      new LogFormatter(
        (entry) => typeof entry === "object",
        (entry) =>
          WonderOptionsHelper.create(undefined, {
            content: [JSON.stringify(entry)],
          }),
        10
      )
    );
  }
  get formatObjectAsMultilineJson(): Wonder {
    return this.format(
      new LogFormatter(
        (entry) => typeof entry === "object",
        (entry) =>
          WonderOptionsHelper.create(undefined, {
            content: [JSON.stringify(entry, null, 2)],
          }),
        10
      )
    );
  }
  get formatArrayAsIndividualItems(): Wonder {
    return this.format(
      new LogFormatter(
        (entry) => Array.isArray(entry),
        (entry: any[], parent) =>
          WonderOptionsHelper.create(parent, {
            content: entry,
            innerSeparator: ", ",
            prefixValue: {
              content: ["["],
            },
            postfixValue: {
              content: ["]"],
            },
          })
      )
    );
  }
  //#endregion Formatters
}
