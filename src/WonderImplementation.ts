// tslint:disable: no-console
import { LogFormatter } from "./LogFormatter";
import { NumberLogFormatter } from "./NumberLogFormatter";
import { LogStyle } from "./LogStyle";
import WonderHelper from "./WonderHelper";
import { LogEntry, Wonder } from "./Wonder";
import { WonderOptions } from "./WonderOptions";
import WonderOptionsHelper from "./WonderOptionsHelper";

const colors = {
  orange: "hsl(14,  100%, 53%)",
  yellow: "hsl(48,  100%, 67%)",
  green: "hsl(141, 53%,  53%)",
  turquoise: "hsl(171, 100%, 41%)",
  cyan: "hsl(204, 71%,  53%)",
  blue: "hsl(217, 71%,  53%)",
  purple: "hsl(271, 100%, 71%)",
  red: "hsl(348, 86%, 61%)",
  black: "black",
  white: "white",
};

export default class WonderImplementation {
  options: WonderOptions;

  constructor(options?: WonderOptions) {
    this.options = Object.assign({}, options);
  }

  toString(): string {
    return "Wonder [" + JSON.stringify(this.options) + "]";
  }

  //#region Logging methods
  /**
   * Logs `entries` to the browser console using `console.log`, applying styles from any wonderlog entries.
   */
  log(...entries: LogEntry[]) {
    console.log(...WonderHelper.GenerateLogElements(this, entries));
  }
  /**
   * Logs `entries` to the browser console using `console.debug`, applying styles from any wonderlog entries.
   */
  debug(...entries: LogEntry[]): void {
    console.debug(...WonderHelper.GenerateLogElements(this, entries));
  }
  /**
   * Logs `entries` to the browser console using `console.warn`, applying styles from any wonderlog entries.
   */
  warn(...entries: LogEntry[]): void {
    console.warn(...WonderHelper.GenerateLogElements(this, entries));
  }
  /**
   * Logs `entries` to the browser console using `console.error`, applying styles from any wonderlog entries.
   */
  error(...entries: LogEntry[]): void {
    console.error(...WonderHelper.GenerateLogElements(this, entries));
  }
  /**
   * Logs `entries` to the browser console using `console.group`, applying styles from any wonderlog entries.
   * Increases the indent of any following logs, until you close the group with `wonder.groupEnd`
   */
  group(...entries: LogEntry[]): void {
    console.group(...WonderHelper.GenerateLogElements(this, entries));
  }
  /**
   * Logs `entries` to the browser console using `console.groupCollapsed`, applying styles from any wonderlog entries.
   * Increases the indent of any following logs, until you close the group with `wonder.groupEnd`.
   * The following entries are hidden by default, until the group is expanded in the developer tools.
   */
  groupCollapsed(...entries: LogEntry[]): void {
    console.groupCollapsed(...WonderHelper.GenerateLogElements(this, entries));
  }
  /**
   * Closes last log group and decreases the indent level
   */
  groupEnd(): void {
    console.groupEnd();
  }
  //#endregion Logging methods
  //#region Setting content
  /**
   * Sets the content to be logged.
   * Wonderlog instances can also be called as a function for a shorthand of this method.
   *
   * ```js
   * wonder.log(wonder.red._apply("red text"));
   * wonder.log(wonder.red("red text"));
   * ```
   */
  _apply(content: LogEntry[]): Wonder {
    return WonderHelper.create(this, { content });
  }

  /**
   * Adds a prefix to the content of this entry.
   *
   * ```js
   * wonder.log(wonder.pre("👉")("look at me!")) // 👉look at me!
   * ```
   */
  pre(prefixValue: WonderOptions | string): Wonder {
    if (typeof prefixValue === "string") {
      return WonderHelper.create(this, {
        prefixValue: { content: [prefixValue] },
      });
    }

    return WonderHelper.create(this, { prefixValue });
  }
  /**
   * Adds a postfix to the content of this entry.
   *
   * ```js
   * wonder.log(wonder.post("👈")("look at me!")) // look at me!👈
   * ```
   */
  post(postfixValue: WonderOptions | string): Wonder {
    if (typeof postfixValue === "string") {
      return WonderHelper.create(this, {
        postfixValue: { content: [postfixValue] },
      });
    }

    return WonderHelper.create(this, { postfixValue });
  }

  /**
   * Sets the inner separator to be used between inner elements of this log entry.
   * Defaults to one space: " "
   *
   * ```js
   * wonder.log(wonder.separator("+")("first", "second")) // first+second
   * ```
   */
  separator(separatorString: string): Wonder {
    return WonderHelper.create(this, {
      innerSeparator: separatorString,
    });
  }
  /**
   * Sets the separator to be used between the prefix (set by `pre`) and the contents of this entry.
   * Only used when there is a prefix.
   *
   * ```js
   * wonder.log(wonder.preSeparator(": ").pre("Simon says")("Hello world!"))
   * // Simon says: Hello world!
   * ```
   */
  preSeparator(prefixSeparator: string): Wonder {
    return WonderHelper.create(this, { prefixSeparator });
  }
  /**
   * Sets the separator to be used between the postfix (set by `post`) and the contents of this entry.
   * Only used when there is a postfix.
   *
   * ```js
   * wonder.log(wonder.postSeparator(" - ").post("said Simon")("Hello world!"))
   * // Hello world! - said Simon
   * ```
   */
  postSeparator(postfixSeparator: string): Wonder {
    return WonderHelper.create(this, { postfixSeparator });
  }
  /**
   * An alias for `separator("")`.
   */
  get noSeparator(): Wonder {
    return this.separator("");
  }
  //#endregion Setting content
  //#region Setting styles
  /**
   * Sets the text color. The color can be any color string format accepted by the browser in css.
   *
   * In most cases you should use the predefined colors, like `wonder.red`, `wonder.green` etc.
   *
   * ```js
   * wonder.log(wonder.color("hsl(271, 100%, 71%)")("purple text"));
   * ```
   */
  color(color: string): Wonder {
    return WonderHelper.create(this, {
      style: { color },
    });
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get red(): Wonder {
    return this.color(colors.red);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get green(): Wonder {
    return this.color(colors.green);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get blue(): Wonder {
    return this.color(colors.blue);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get orange(): Wonder {
    return this.color(colors.orange);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get yellow(): Wonder {
    return this.color(colors.yellow);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get turquoise(): Wonder {
    return this.color(colors.turquoise);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get cyan(): Wonder {
    return this.color(colors.cyan);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get purple(): Wonder {
    return this.color(colors.purple);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get black(): Wonder {
    return this.color(colors.black);
  }
  /**
   * Sets text color. An alias for `wonder.color`.
   */
  get white(): Wonder {
    return this.color(colors.white);
  }

  /**
   * Sets the background color. The color can be any color string format accepted by the browser in css.
   *
   * In most cases you should use the predefined colors, like `wonder.bgRed`, `wonder.bgGreen` etc.
   *
   * ```js
   * wonder.log(wonder.bg("hsl(271, 100%, 71%)")("Text on a purple background"));
   * ```
   */
  bg(bgColor: string): Wonder {
    return WonderHelper.create(this, {
      style: { background: bgColor },
    });
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgOrange(): Wonder {
    return this.bg(colors.orange);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgYellow(): Wonder {
    return this.bg(colors.yellow);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgGreen(): Wonder {
    return this.bg(colors.green);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgTurquoise(): Wonder {
    return this.bg(colors.turquoise);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgCyan(): Wonder {
    return this.bg(colors.cyan);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgBlue(): Wonder {
    return this.bg(colors.blue);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgPurple(): Wonder {
    return this.bg(colors.purple);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgRed(): Wonder {
    return this.bg(colors.red);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgBlack(): Wonder {
    return this.bg(colors.black);
  }
  /**
   * Sets the background color. An alias for `wonder.bg`.
   */
  get bgWhite(): Wonder {
    return this.bg(colors.white);
  }

  fontWeight(fontWeight?: string): Wonder {
    return WonderHelper.create(this, {
      style: { font_weight: fontWeight },
    });
  }
  get normal(): Wonder {
    return this.fontWeight("normal");
  }
  get bold(): Wonder {
    return this.fontWeight("bold");
  }
  get lighter(): Wonder {
    return this.fontWeight("lighter");
  }
  get bolder(): Wonder {
    return this.fontWeight("bolder");
  }

  fontStyle(fontStyle?: string): Wonder {
    return WonderHelper.create(this, {
      style: { font_style: fontStyle },
    });
  }
  /** An alias for `fontStyleItalic` */
  get italic(): Wonder {
    return this.fontStyleItalic;
  }
  /** Sets the `font-style` css property to `italic` */
  get fontStyleItalic(): Wonder {
    return this.fontStyle("italic");
  }
  /** Sets the `font-style` css property to `normal` */
  get fontStyleNormal(): Wonder {
    return this.fontStyle("normal");
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
        color: colors.white,
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
        background: colors.yellow,
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
