import LogStyleHelper from "./LogStyleHelper";
import { Wonder } from "./Wonder";
import WonderHelper from "./WonderHelper";
import { WonderOptions } from "./WonderOptions";

export default class WonderOptionsHelper {
  static defaultOptions(): WonderOptions {
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

  static createOptions(
    cloneFrom?: WonderOptions,
    options?: Partial<WonderOptions>
  ) {
    const newOptions = cloneFrom
      ? WonderOptionsHelper.cloneOptions(cloneFrom)
      : WonderOptionsHelper.defaultOptions();
  }
  static mergeOptions(
    first: WonderOptions,
    second: WonderOptions
  ): WonderOptions {
    return {
      style: LogStyleHelper.Merge(first.style, second.style),
      content: [...first.content, ...second.content],
      formatters: [...first.formatters, ...second.formatters],
      prefixValue: second.prefixValue,
      postfixValue: second.postfixValue,
      defaultTrailingSeparator:
        second.defaultTrailingSeparator ?? first.defaultTrailingSeparator,
      trailingSeparator: second.trailingSeparator ?? first.trailingSeparator,
    };
  }

  static overrideOptions(
    initial: WonderOptions,
    overrides: Partial<WonderOptions>
  ): void {
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
          initial[key] = WonderHelper.create(overrides[key]);
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

  static cloneOptions(options: WonderOptions): WonderOptions {
    return {
      style: options.style,
      content: [...options.content],
      prefixValue: WonderHelper.create(options.prefixValue),
      postfixValue: WonderHelper.create(options.postfixValue),
      defaultTrailingSeparator: options.defaultTrailingSeparator,
      trailingSeparator: options.trailingSeparator,
      formatters: [...options.formatters],
    };
  }
}
