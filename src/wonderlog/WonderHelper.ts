import LogStyleHelper from "./LogStyleHelper.js";
import {
  definePropertyGetter,
  definePropertyValue,
} from "./typescriptHelpers/defineProperty.js";
import { LogEntry, Wonder } from "./Wonder";
import { WonderEntryFlat } from "./WonderEntryFlat.js";
import WonderImplementation from "./WonderImplementation.js";
import { WonderOptions } from "./WonderOptions.js";
import WonderOptionsHelper from "./WonderOptionsHelper.js";

const WonderHelper = {
  newWonderInstance(options?: WonderOptions): Wonder {
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
    definePropertyValue(wonderFunction, "preSeparator", wonder);
    definePropertyValue(wonderFunction, "postSeparator", wonder);
    definePropertyGetter(wonderFunction, "noSeparator", wonder);

    definePropertyValue(wonderFunction, "color", wonder);
    definePropertyGetter(wonderFunction, "orange", wonder);
    definePropertyGetter(wonderFunction, "yellow", wonder);
    definePropertyGetter(wonderFunction, "green", wonder);
    definePropertyGetter(wonderFunction, "turquoise", wonder);
    definePropertyGetter(wonderFunction, "cyan", wonder);
    definePropertyGetter(wonderFunction, "blue", wonder);
    definePropertyGetter(wonderFunction, "purple", wonder);
    definePropertyGetter(wonderFunction, "red", wonder);
    definePropertyGetter(wonderFunction, "black", wonder);
    definePropertyGetter(wonderFunction, "white", wonder);

    definePropertyValue(wonderFunction, "bg", wonder);
    definePropertyGetter(wonderFunction, "bgOrange", wonder);
    definePropertyGetter(wonderFunction, "bgYellow", wonder);
    definePropertyGetter(wonderFunction, "bgGreen", wonder);
    definePropertyGetter(wonderFunction, "bgTurquoise", wonder);
    definePropertyGetter(wonderFunction, "bgCyan", wonder);
    definePropertyGetter(wonderFunction, "bgBlue", wonder);
    definePropertyGetter(wonderFunction, "bgPurple", wonder);
    definePropertyGetter(wonderFunction, "bgRed", wonder);
    definePropertyGetter(wonderFunction, "bgBlack", wonder);
    definePropertyGetter(wonderFunction, "bgWhite", wonder);

    definePropertyValue(wonderFunction, "fontWeight", wonder);
    definePropertyGetter(wonderFunction, "normal", wonder);
    definePropertyGetter(wonderFunction, "bold", wonder);
    definePropertyGetter(wonderFunction, "lighter", wonder);
    definePropertyGetter(wonderFunction, "bolder", wonder);

    definePropertyValue(wonderFunction, "fontStyle", wonder);
    definePropertyGetter(wonderFunction, "italic", wonder);
    definePropertyGetter(wonderFunction, "fontStyleItalic", wonder);
    definePropertyGetter(wonderFunction, "fontStyleNormal", wonder);

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
  },

  create(cloneFrom?: WonderImplementation, options?: WonderOptions): Wonder {
    return WonderHelper.newWonderInstance(
      WonderOptionsHelper.create(cloneFrom?.options, options)
    );
  },

  isWonder(obj: any): obj is Wonder {
    return (
      (typeof obj === "function" || typeof obj === "object") &&
      "_apply" in obj &&
      "options" in obj
    );
  },
  isWonderEntryFlat(obj: any): obj is WonderEntryFlat {
    return (
      typeof obj === "object" &&
      "content" in obj &&
      "style" in obj &&
      "trailingSeparator" in obj
    );
  },

  merge(first: WonderImplementation, second: WonderImplementation): Wonder {
    return WonderHelper.create(
      undefined,
      WonderOptionsHelper.merge(first.options, second.options)
    );
  },

  GenerateLogElements(
    parent: WonderImplementation,
    entries: LogEntry[]
  ): any[] {
    // Find index of last wonder-type entry
    let lastWonderIndex = entries.length - 1;
    for (; lastWonderIndex >= 0; lastWonderIndex--) {
      if (WonderHelper.isWonder(entries[lastWonderIndex])) break;
    }

    // Flatten wonder-type entries
    const mergedParent = WonderOptionsHelper.create(
      WonderOptionsHelper.default(),
      parent.options
    );
    const flattenedEntries: LogEntry = [];
    if (lastWonderIndex >= 0)
      flattenedEntries.push(
        ...WonderHelper.Flatten(
          { content: entries.slice(0, lastWonderIndex + 1) },
          mergedParent
        )
      );
    const lastFlattenedWonderIndex = flattenedEntries.length - 1;
    flattenedEntries.push(...entries.slice(lastWonderIndex + 1));

    const strings: string[] = [];
    const styles: string[] = [];
    const objects: any[] = [];
    for (let i = 0; i < flattenedEntries.length; i++) {
      if (i <= lastFlattenedWonderIndex) {
        const entry = flattenedEntries[i] as WonderEntryFlat;
        strings.push(
          "%c" +
            entry.content[0] +
            (i < lastFlattenedWonderIndex ? "%c" + entry.trailingSeparator : "")
        );
        styles.push(LogStyleHelper.GetCss(entry.style));
        if (i < lastFlattenedWonderIndex) styles.push("");
      } else {
        objects.push(flattenedEntries[i]);
      }
    }

    const joinedStrings = strings.join("");
    return joinedStrings
      ? [joinedStrings, ...styles, ...objects]
      : [...objects];
  },

  Flatten(current: WonderOptions, parent: WonderOptions): WonderEntryFlat[] {
    const mergedParent = WonderOptionsHelper.merge(parent, current);
    const mergedParentWithoutFormatters = WonderOptionsHelper.create(
      mergedParent,
      {
        formatters: [],
      }
    );
    const flattenedEntries: WonderEntryFlat[] = [];

    function setLastEntrySeparator(
      entries: WonderEntryFlat[],
      separator?: string
    ) {
      if (entries.length > 0)
        entries[entries.length - 1].trailingSeparator = separator ?? "";
    }

    if (current.prefixValue) {
      const prefixEntries = WonderHelper.Flatten(
        current.prefixValue,
        mergedParentWithoutFormatters
      );
      setLastEntrySeparator(prefixEntries, mergedParent.prefixSeparator);

      flattenedEntries.push(...prefixEntries);
    }

    if (current.content) {
      mergedParent.formatters?.sort(
        (a, b) => (a.priority || 0) - (b.priority || 0)
      );

      for (const contentEntry of current.content) {
        if (WonderHelper.isWonder(contentEntry)) {
          flattenedEntries.push(
            ...WonderHelper.Flatten(contentEntry.options, mergedParent)
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
        setLastEntrySeparator(flattenedEntries, mergedParent.innerSeparator);
      }
    }

    if (current.postfixValue) {
      setLastEntrySeparator(flattenedEntries, mergedParent.postfixSeparator);

      const postfixEntries = WonderHelper.Flatten(
        current.postfixValue,
        mergedParentWithoutFormatters
      );

      flattenedEntries.push(...postfixEntries);
    }

    return flattenedEntries;
  },

  GetFormattedEntry(
    entry: LogEntry,
    mergedParent: WonderOptions,
    mergedParentWithoutFormatters: WonderOptions
  ): WonderEntryFlat[] {
    if (mergedParent.formatters) {
      for (const formatter of mergedParent.formatters) {
        if (formatter.filter(entry, mergedParent)) {
          return WonderHelper.Flatten(
            formatter.format(entry, mergedParent),
            mergedParentWithoutFormatters
          );
        }
      }
    }

    // Default
    return [
      {
        content: [entry],
        style: mergedParent.style ?? {},
        trailingSeparator: mergedParent.innerSeparator ?? "",
      },
    ];
  },
};
export default WonderHelper;
