import LogStyleHelper from "./LogStyleHelper";
import {
  definePropertyGetter,
  definePropertyValue,
} from "./typescriptHelpers/defineProperty";
import { LogEntry, Wonder } from "./Wonder";
import WonderImplementation from "./WonderImplementation";
import { WonderOptions } from "./WonderOptions";
import WonderOptionsHelper from "./WonderOptionsHelper";

export default class WonderHelper {
  static newWonderInstance(options?: WonderOptions): Wonder {
    const wonder = new WonderImplementation(options);

    // Create the wonder function
    const wonderFunction = function (
      this: WonderImplementation,
      ...content: LogEntry[]
    ) {
      return wonder._apply(content);
    };

    // Copy properties of wonder onto the wonder function
    definePropertyValue(wonderFunction, "options", wonder);

    definePropertyValue(wonderFunction, "toString", wonder);

    definePropertyValue(wonderFunction, "log", wonder);
    definePropertyValue(wonderFunction, "debug", wonder);
    definePropertyValue(wonderFunction, "warn", wonder);
    definePropertyValue(wonderFunction, "error", wonder);
    definePropertyValue(wonderFunction, "group", wonder);
    definePropertyValue(wonderFunction, "groupCollapsed", wonder);
    definePropertyValue(wonderFunction, "groupEnd", wonder);

    definePropertyValue(wonderFunction, "_apply", wonder);
    definePropertyValue(wonderFunction, "pre", wonder);
    definePropertyValue(wonderFunction, "post", wonder);
    definePropertyValue(wonderFunction, "separator", wonder);
    definePropertyGetter(wonderFunction, "noSeparator", wonder);

    definePropertyValue(wonderFunction, "color", wonder);
    definePropertyGetter(wonderFunction, "red", wonder);
    definePropertyGetter(wonderFunction, "blue", wonder);
    definePropertyGetter(wonderFunction, "black", wonder);
    definePropertyGetter(wonderFunction, "white", wonder);
    definePropertyGetter(wonderFunction, "purple", wonder);

    definePropertyValue(wonderFunction, "bg", wonder);
    definePropertyGetter(wonderFunction, "bgRed", wonder);
    definePropertyGetter(wonderFunction, "bgBlack", wonder);

    definePropertyValue(wonderFunction, "fontWeight", wonder);
    definePropertyGetter(wonderFunction, "bold", wonder);

    definePropertyValue(wonderFunction, "fontStyle", wonder);
    definePropertyGetter(wonderFunction, "italic", wonder);

    definePropertyValue(wonderFunction, "padding", wonder);
    definePropertyValue(wonderFunction, "border", wonder);
    definePropertyValue(wonderFunction, "borderRadius", wonder);

    definePropertyGetter(wonderFunction, "tag", wonder);
    definePropertyGetter(wonderFunction, "dangerTag", wonder);
    definePropertyGetter(wonderFunction, "successTag", wonder);
    definePropertyGetter(wonderFunction, "warningTag", wonder);

    definePropertyValue(wonderFunction, "format", wonder);
    definePropertyGetter(wonderFunction, "formatStringAsLiteral", wonder);
    definePropertyGetter(wonderFunction, "formatNumberAsLiteral", wonder);
    definePropertyValue(wonderFunction, "formatNumberAs", wonder);
    definePropertyGetter(wonderFunction, "formatObjectAsJson", wonder);
    definePropertyGetter(wonderFunction, "formatObjectAsMultilineJson", wonder);
    definePropertyGetter(
      wonderFunction,
      "formatArrayAsIndividualItems",
      wonder
    );

    return wonderFunction;
  }

  static create(
    cloneFrom?: WonderImplementation,
    options?: Partial<WonderOptions>
  ): Wonder {
    // Create a new wonder instance
    const wonder = WonderHelper.newWonderInstance(
      cloneFrom
        ? WonderOptionsHelper.cloneOptions(cloneFrom.options)
        : undefined
    );

    // Apply changes
    if (options) {
      if (options.style != null)
        wonder.options.style = LogStyleHelper.Merge(
          wonder.options.style,
          options.style
        );
      if (options.content != null) wonder.options.content = options.content;
      if (options.prefixValue != null)
        wonder.options.prefixValue = WonderHelper.create(options.prefixValue);
      if (options.postfixValue != null)
        wonder.options.postfixValue = WonderHelper.create(options.postfixValue);
      if (options.formatters != null)
        wonder.options.formatters = options.formatters;
      if (options.defaultTrailingSeparator != null)
        wonder.options.defaultTrailingSeparator =
          options.defaultTrailingSeparator;
      if (options.trailingSeparator != null)
        wonder.options.trailingSeparator = options.trailingSeparator;
    }

    return wonder;
  }

  static clone(
    cloneFrom: WonderImplementation | undefined
  ): WonderImplementation | undefined {
    return cloneFrom == null
      ? undefined
      : new WonderImplementation(
          WonderOptionsHelper.cloneOptions(cloneFrom.options)
        );
  }
  static isWonder(obj: any): obj is Wonder {
    return (
      (typeof obj === "function" || typeof obj === "object") &&
      "_apply" in obj &&
      "options" in obj
    );
  }
  static merge(
    first: WonderImplementation,
    second: WonderImplementation
  ): Wonder {
    return WonderHelper.create(
      undefined,
      WonderOptionsHelper.mergeOptions(first.options, second.options)
    );
  }

  static GenerateLogElements(
    parent: WonderImplementation,
    entries: LogEntry[]
  ): any[] {
    // Flatten all entries
    const flattenedEntries: LogEntry = [];
    for (const entry of entries) {
      if (WonderHelper.isWonder(entry)) {
        flattenedEntries.push(...WonderHelper.Flatten(entry, parent));
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
          styles.push(LogStyleHelper.GetCss(entry.options.style));
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

  static Flatten(
    current: WonderImplementation,
    parent: WonderImplementation
  ): LogEntry[] {
    const mergedParent = WonderHelper.merge(parent, current);
    const mergedParentWithoutFormatters = WonderHelper.create(mergedParent, {
      formatters: [],
    });
    const flattenedEntries: LogEntry[] = [];

    if (current.options.prefixValue) {
      if (WonderHelper.isWonder(current.options.prefixValue)) {
        flattenedEntries.push(
          ...WonderHelper.Flatten(
            current.options.prefixValue,
            mergedParentWithoutFormatters
          )
        );
      } else {
        flattenedEntries.push(
          WonderHelper.create(mergedParentWithoutFormatters, {
            content: [current.options.prefixValue],
            prefixValue: undefined,
            postfixValue: undefined,
          })
        );
      }
    }

    mergedParent.options.formatters.sort(
      (a, b) => (a.priority || 0) - (b.priority || 0)
    );

    for (const contentEntry of current.options.content) {
      if (WonderHelper.isWonder(contentEntry)) {
        flattenedEntries.push(
          ...WonderHelper.Flatten(contentEntry, mergedParent)
        );
      } else {
        flattenedEntries.push(
          ...WonderHelper.GetFormattedEntry(
            contentEntry,
            mergedParent,
            mergedParentWithoutFormatters
          )
        );
      }
    }

    if (current.options.postfixValue) {
      if (WonderHelper.isWonder(current.options.postfixValue)) {
        flattenedEntries.push(
          ...WonderHelper.Flatten(
            current.options.postfixValue,
            mergedParentWithoutFormatters
          )
        );
      } else {
        flattenedEntries.push(
          WonderHelper.create(mergedParentWithoutFormatters, {
            content: [current.options.postfixValue],
            prefixValue: undefined,
            postfixValue: undefined,
          })
        );
      }
    }
    return flattenedEntries;
  }

  static GetFormattedEntry(
    entry: LogEntry,
    mergedParent: Wonder,
    mergedParentWithoutFormatters: Wonder
  ): LogEntry[] {
    for (const formatter of mergedParent.options.formatters) {
      if (formatter.filter(entry, mergedParent)) {
        return WonderHelper.Flatten(
          formatter.format(entry, mergedParent),
          mergedParentWithoutFormatters
        );
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
}
