import LogStyleHelper from "./LogStyleHelper";
import WonderHelper from "./WonderHelper";
import { WonderOptions } from "./WonderOptions";

export default class WonderOptionsHelper {
  static newWonderOptions(): WonderOptions {
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
      : WonderOptionsHelper.newWonderOptions();
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
