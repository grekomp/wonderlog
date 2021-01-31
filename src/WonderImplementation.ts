// tslint:disable: no-console
import { LogFormatter } from "./LogFormatter";
import { NumberLogFormatter } from "./NumberLogFormatter";
import LogStyle from "./LogStyle";
import WonderHelper from "./WonderHelper";
import { LogEntry, Wonder } from "./Wonder";
import { WonderOptions } from "./WonderOptions";

export class WonderImplementation {
  options: WonderOptions;

  constructor(options?: WonderOptions) {
    this.options = Object.assign(
      {
        style: new LogStyle(),
        content: [],
        prefixValue: undefined,
        postfixValue: undefined,
        defaultTrailingSeparator: " ",
        trailingSeparator: undefined,
        formatters: [],
      },
      options ?? {}
    );
  }

  toString(): string {
    return "Wonder [" + JSON.stringify(this.options) + "]";
  }

  //#region Logging methods
  log(...entries: LogEntry[]) {
    console.log(...this.GenerateLogElements(entries));
  }
  debug(...entries: LogEntry[]): void {
    console.debug(...this.GenerateLogElements(entries));
  }
  warn(...entries: LogEntry[]): void {
    console.warn(...this.GenerateLogElements(entries));
  }
  error(...entries: LogEntry[]): void {
    console.error(...this.GenerateLogElements(entries));
  }
  group(...entries: LogEntry[]): void {
    console.group(...this.GenerateLogElements(entries));
  }
  groupCollapsed(...entries: LogEntry[]): void {
    console.groupCollapsed(...this.GenerateLogElements(entries));
  }
  groupEnd(): void {
    console.groupEnd();
  }

  GenerateLogElements(entries: LogEntry[]): any[] {
    // Flatten all entries
    const flattenedEntries: LogEntry = [];
    for (const entry of entries) {
      if (WonderHelper.isWonder(entry)) {
        flattenedEntries.push(...entry.Flatten(this));
      } else {
        flattenedEntries.push(entry);
      }
    }

    // Find index of last wonder-type entry
    let lastWonderIndex = flattenedEntries.length - 1;
    for (; lastWonderIndex >= 0; lastWonderIndex--) {
      if (WonderHelper.isWonder(flattenedEntries[lastWonderIndex])) break;
    }

    const strings: string[] = [];
    const styles: string[] = [];
    const objects: any[] = [];
    for (let i = 0; i < flattenedEntries.length; i++) {
      if (i <= lastWonderIndex) {
        if (WonderHelper.isWonder(flattenedEntries[i])) {
          const entry = flattenedEntries[i] as WonderImplementation;
          strings.push(
            "%c" +
              entry.options.content[0] +
              (i < lastWonderIndex
                ? "%c" +
                  (entry.options.trailingSeparator ??
                    entry.options.defaultTrailingSeparator)
                : "")
          );
          styles.push(entry.options.style.GetCss());
          if (i < lastWonderIndex) styles.push("");
        } else {
          strings.push("%c" + flattenedEntries[i] + "%c ");
          styles.push("", "");
        }
      } else {
        objects.push(flattenedEntries[i]);
      }
    }

    const joinedStrings = strings.join("");
    return joinedStrings
      ? [joinedStrings, ...styles, ...objects]
      : [...objects];
  }
  Flatten(parent: WonderImplementation): LogEntry[] {
    const mergedParent = WonderHelper.merge(parent, this);
    const mergedParentWithoutFormatters = WonderHelper.create(mergedParent, {
      formatters: [],
    });
    const flattenedEntries: LogEntry[] = [];

    if (this.options.prefixValue) {
      if (WonderHelper.isWonder(this.options.prefixValue)) {
        flattenedEntries.push(
          ...this.options.prefixValue.Flatten(mergedParentWithoutFormatters)
        );
      } else {
        flattenedEntries.push(
          WonderHelper.create(mergedParentWithoutFormatters, {
            content: [this.options.prefixValue],
            prefixValue: undefined,
            postfixValue: undefined,
          })
        );
      }
    }

    mergedParent.options.formatters.sort(
      (a, b) => (a.priority || 0) - (b.priority || 0)
    );

    for (const contentEntry of this.options.content) {
      if (WonderHelper.isWonder(contentEntry)) {
        flattenedEntries.push(...contentEntry.Flatten(mergedParent));
      } else {
        flattenedEntries.push(
          ...this.GetFormattedEntry(
            contentEntry,
            mergedParent,
            mergedParentWithoutFormatters
          )
        );
      }
    }

    if (this.options.postfixValue) {
      if (WonderHelper.isWonder(this.options.postfixValue)) {
        flattenedEntries.push(
          ...this.options.postfixValue.Flatten(mergedParentWithoutFormatters)
        );
      } else {
        flattenedEntries.push(
          WonderHelper.create(mergedParentWithoutFormatters, {
            content: [this.options.postfixValue],
            prefixValue: undefined,
            postfixValue: undefined,
          })
        );
      }
    }
    return flattenedEntries;
  }
  GetFormattedEntry(
    entry: LogEntry,
    mergedParent: Wonder,
    mergedParentWithoutFormatters: Wonder
  ): LogEntry[] {
    for (const formatter of mergedParent.options.formatters) {
      if (formatter.filter(entry, mergedParent)) {
        return formatter
          .format(entry, mergedParent)
          .Flatten(mergedParentWithoutFormatters);
      }
    }

    // Default
    return [
      WonderHelper.create(mergedParent, {
        content: [entry],
        prefixValue: undefined,
        postfixValue: undefined,
      }),
    ];
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
      trailingSeparator: separatorString,
    });
  }
  get noSeparator(): Wonder {
    return this.separator("");
  }
  //#endregion Setting content
  //#region Setting styles
  color(color: string): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({ color }),
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
      style: new LogStyle({ background: bgColor }),
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
      style: new LogStyle({ font_weight: fontWeight }),
    });
  }
  get bold(): Wonder {
    return this.fontWeight("bold");
  }

  fontStyle(fontStyle?: string): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({ font_style: fontStyle }),
    });
  }
  get italic(): Wonder {
    return this.fontStyle("italic");
  }

  padding(padding?: string): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({ padding }),
    });
  }
  border(border?: string): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({ border }),
    });
  }
  borderRadius(borderRadius?: string): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({ border_radius: borderRadius }),
    });
  }
  //#endregion Setting styles
  //#region Style combinations
  get tag(): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({
        padding: "0 4px",
        border: "1px solid #666",
        border_radius: "2px",
        background: "rgba(0,0,0,0.8)",
      }),
    });
  }
  get dangerTag(): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({
        padding: "0 4px",
        border_radius: "2px",
        background: "hsl(348, 100%, 61%)",
        color: "white",
      }),
    });
  }
  get successTag(): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({
        padding: "0 4px",
        border_radius: "2px",
        background: "hsl(141, 71%, 48%)",
      }),
    });
  }
  get warningTag(): Wonder {
    return WonderHelper.create(this, {
      style: new LogStyle({
        padding: "0 4px",
        border_radius: "2px",
        background: "hsl(48, 100%, 67%)",
        color: "rgba(0,0,0,.7)",
      }),
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
      formatters: [...this.options.formatters, ...formatters],
    });
  }
  get formatStringAsLiteral(): Wonder {
    return this.format(
      new LogFormatter(
        (entry) => typeof entry === "string",
        (entry, parent) => {
          return WonderHelper.create(undefined, {
            content: [entry],
            style: new LogStyle({
              color: "#F28B54",
            }),
            trailingSeparator: "",
            prefixValue: WonderHelper.create(undefined, {
              content: ['"'],
              trailingSeparator: "",
            }),
            postfixValue: WonderHelper.create(undefined, {
              content: ['"'],
              trailingSeparator: parent.options.trailingSeparator,
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
          WonderHelper.create(undefined, {
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
          WonderHelper.create(undefined, {
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
        (entry, parent) =>
          WonderHelper.create(parent, {
            content: [
              ...entry.slice(0, -1).map((el: Wonder) =>
                WonderHelper.isWonder(el)
                  ? WonderHelper.create(el, {
                      trailingSeparator: ", ",
                    })
                  : WonderHelper.create(undefined, {
                      content: [el],
                      formatters: [...parent.options.formatters],
                      trailingSeparator: ", ",
                    })
              ),
              WonderHelper.isWonder(entry[entry.length - 1])
                ? WonderHelper.create(entry[entry.length - 1], {
                    trailingSeparator: "",
                  })
                : WonderHelper.create(undefined, {
                    content: [entry[entry.length - 1]],
                    formatters: [...parent.options.formatters],
                    trailingSeparator: "",
                  }),
            ],
            prefixValue: WonderHelper.create(undefined, {
              content: ["["],
              trailingSeparator: "",
            }),
            postfixValue: WonderHelper.create(undefined, {
              content: ["]"],
            }),
          })
      )
    );
  }
}
