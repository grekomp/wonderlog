import WonderHelper from "./WonderHelper";
import { WonderOptions } from "./WonderOptions";

export default class WonderOptionsHelper {
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
