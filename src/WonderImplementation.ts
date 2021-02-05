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

  pre(prefixValue: WonderOptions): Wonder {
    return WonderHelper.create(this, { prefixValue });
  }
  post(postfixValue: WonderOptions): Wonder {
    return WonderHelper.create(this, { postfixValue });
  }

  separator(separatorString: string): Wonder {
    return WonderHelper.create(this, {
      innerSeparator: separatorString,
    });
  }
  preSeparator(prefixSeparator: string): Wonder {
    return WonderHelper.create(this, { prefixSeparator });
  }
  postSeparator(postfixSeparator: string): Wonder {
    return WonderHelper.create(this, { postfixSeparator });
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
    return this.color(colors.red);
  }
  get green(): Wonder {
    return this.color(colors.green);
  }
  get blue(): Wonder {
    return this.color(colors.blue);
  }
  get orange(): Wonder {
    return this.color(colors.orange);
  }
  get yellow(): Wonder {
    return this.color(colors.yellow);
  }
  get turquoise(): Wonder {
    return this.color(colors.turquoise);
  }
  get cyan(): Wonder {
    return this.color(colors.cyan);
  }
  get purple(): Wonder {
    return this.color(colors.purple);
  }
  get black(): Wonder {
    return this.color(colors.black);
  }
  get white(): Wonder {
    return this.color(colors.white);
  }

  bg(bgColor: string): Wonder {
    return WonderHelper.create(this, {
      style: { background: bgColor },
    });
  }
  get bgOrange(): Wonder {
    return this.bg(colors.orange);
  }
  get bgYellow(): Wonder {
    return this.bg(colors.yellow);
  }
  get bgGreen(): Wonder {
    return this.bg(colors.green);
  }
  get bgTurquoise(): Wonder {
    return this.bg(colors.turquoise);
  }
  get bgCyan(): Wonder {
    return this.bg(colors.cyan);
  }
  get bgBlue(): Wonder {
    return this.bg(colors.blue);
  }
  get bgPurple(): Wonder {
    return this.bg(colors.purple);
  }
  get bgRed(): Wonder {
    return this.bg(colors.red);
  }
  get bgBlack(): Wonder {
    return this.bg(colors.black);
  }
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
