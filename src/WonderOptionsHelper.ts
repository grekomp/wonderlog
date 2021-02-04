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
      defaultTrailingSeparator: " ",
      trailingSeparator: undefined,
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
      defaultTrailingSeparator:
        second.defaultTrailingSeparator ?? first.defaultTrailingSeparator,
      trailingSeparator: second.trailingSeparator ?? first.trailingSeparator,
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
        case "defaultTrailingSeparator":
          initial.defaultTrailingSeparator =
            overrides.defaultTrailingSeparator ?? "";
          break;
        case "trailingSeparator":
          initial.trailingSeparator = overrides.trailingSeparator;
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
        case "defaultTrailingSeparator":
          clonedOptions.defaultTrailingSeparator =
            options.defaultTrailingSeparator;
          break;
        case "trailingSeparator":
          clonedOptions.trailingSeparator = options.trailingSeparator;
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
