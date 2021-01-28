import {
  definePropertyGetter,
  definePropertyValue,
} from "./typescriptHelpers/defineProperty";
import { LogEntry, Wonder } from "./Wonder";
import { WonderImplementation } from "./WonderImplementation";
import { WonderOptions } from "./WonderOptions";

export default class WonderHelper {
  static create(
    cloneFrom?: WonderImplementation,
    options?: Partial<WonderOptions>
  ): Wonder {
    // Create a new wonder instance
    const wonder = WonderHelper.clone(cloneFrom) ?? new WonderImplementation();

    // Apply changes
    if (options) {
      if (options.style != null)
        wonder.options.style = wonder.options.style.Merge(options.style);
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

    // Create the wonder function
    const wonderFunction = function (
      this: WonderImplementation,
      ...content: LogEntry[]
    ) {
      return wonder._apply(content);
    };

    // Copy properties of wonder onto the wonder function
    definePropertyValue(wonderFunction, "options", wonder);

    definePropertyValue(wonderFunction, "log", wonder);
    definePropertyValue(wonderFunction, "debug", wonder);
    definePropertyValue(wonderFunction, "warn", wonder);
    definePropertyValue(wonderFunction, "error", wonder);
    definePropertyValue(wonderFunction, "group", wonder);
    definePropertyValue(wonderFunction, "groupCollapsed", wonder);
    definePropertyValue(wonderFunction, "groupEnd", wonder);
    definePropertyValue(wonderFunction, "GenerateLogElements", wonder);
    definePropertyValue(wonderFunction, "Flatten", wonder);
    definePropertyValue(wonderFunction, "GetFormattedEntry", wonder);

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
  static clone(
    cloneFrom: WonderImplementation | undefined
  ): WonderImplementation | undefined {
    return cloneFrom == null
      ? undefined
      : new WonderImplementation({
          style: cloneFrom.options.style,
          content: [...cloneFrom.options.content],
          prefixValue: WonderHelper.create(cloneFrom.options.prefixValue),
          postfixValue: WonderHelper.create(cloneFrom.options.postfixValue),
          defaultTrailingSeparator: cloneFrom.options.defaultTrailingSeparator,
          trailingSeparator: cloneFrom.options.trailingSeparator,
          formatters: [...cloneFrom.options.formatters],
        });
  }
  static isWonder(obj: any): obj is Wonder {
    return (
      (typeof obj === "function" || typeof obj === "object") &&
      "_apply" in obj &&
      "GenerateLogElements" in obj &&
      "Flatten" in obj
    );
  }
  static merge(
    first: WonderImplementation,
    second: WonderImplementation
  ): Wonder {
    return WonderHelper.create(undefined, {
      style: first.options.style.Merge(second.options.style),
      content: [...first.options.content, ...second.options.content],
      formatters: [...first.options.formatters, ...second.options.formatters],
      prefixValue: second.options.prefixValue,
      postfixValue: second.options.postfixValue,
      defaultTrailingSeparator:
        second.options.defaultTrailingSeparator ??
        first.options.defaultTrailingSeparator,
      trailingSeparator:
        second.options.trailingSeparator ?? first.options.trailingSeparator,
    });
  }
}
