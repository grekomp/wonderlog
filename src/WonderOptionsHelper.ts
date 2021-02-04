import LogStyleHelper from "./LogStyleHelper";
import { Wonder } from "./Wonder";
import WonderHelper from "./WonderHelper";
import { WonderOptions } from "./WonderOptions";

export default class WonderOptionsHelper {
  static default(): WonderOptions {
    return {
      style: {},
      content: [],
      prefixValue: undefined,
      postfixValue: undefined,
      prefixSeparator: "",
      innerSeparator: " ",
      postfixSeparator: "",
      formatters: [],
    };
  }

  static create(
    cloneFrom?: WonderOptions,
    options?: WonderOptions
  ): WonderOptions {
    const newOptions = cloneFrom
      ? WonderOptionsHelper.clone(cloneFrom)
      : WonderOptionsHelper.default();

    if (options) {
      WonderOptionsHelper.overwrite(newOptions, options);
    }

    return newOptions;
  }
  static merge(first: WonderOptions, second: WonderOptions): WonderOptions {
    return {
      style: LogStyleHelper.Merge(first.style, second.style),
      content: [...(first.content ?? []), ...(second.content ?? [])],
      formatters: [...(first.formatters ?? []), ...(second.formatters ?? [])],
      prefixValue: second.prefixValue,
      postfixValue: second.postfixValue,
      prefixSeparator: second.prefixSeparator ?? first.prefixSeparator,
      innerSeparator: second.innerSeparator ?? first.innerSeparator,
      postfixSeparator: second.postfixSeparator ?? first.postfixSeparator,
    };
  }

  static overwrite(initial: WonderOptions, overrides: WonderOptions): void {
    // tslint:disable-next-line: forin
    for (const key in overrides) {
      switch (key) {
        case "style":
          initial.style = overrides.style
            ? LogStyleHelper.Merge(initial.style, overrides.style)
            : {};
          break;
        case "prefixValue":
        case "postfixValue":
          initial[key] = WonderOptionsHelper.create(overrides[key]);
          break;
        case "content":
        case "formatters":
          initial[key] = overrides[key] ?? [];
          break;
        case "prefixSeparator":
        case "innerSeparator":
        case "postfixSeparator":
          initial[key] = overrides[key] ?? "";
          break;
      }
    }
  }

  static clone(options: WonderOptions): WonderOptions {
    const clonedOptions: WonderOptions = {};

    // tslint:disable-next-line: forin
    for (const key in options) {
      switch (key) {
        case "style":
          clonedOptions.style = LogStyleHelper.Clone(options.style);
          break;
        case "prefixValue":
        case "postfixValue":
          clonedOptions[key] = WonderOptionsHelper.create(options[key]);
          break;
        case "content":
        case "formatters":
          clonedOptions[key] = options[key]?.slice();
          break;
        case "prefixSeparator":
        case "innerSeparator":
        case "postfixSeparator":
          clonedOptions[key] = options[key] ?? "";
          break;
      }
    }

    return clonedOptions;
  }

  static isWonderOptions(obj: any): obj is WonderOptions {
    return (
      typeof obj === "object" &&
      "style" in obj &&
      "content" in obj &&
      "formatters" in obj
    );
  }
}
